const Restaurant = require("../models/Restaurant");
const { validationResult } = require("express-validator");

exports.createRestaurant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const restaurantData = {
      ...req.body,
      owner: req.user._id,
    };

    if (req.file) {
      restaurantData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate("owner", "name email")
      .populate("reviews.user", "name");

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }


    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updateData = { ...req.body };

   
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const menuItem = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    restaurant.menu.push(menuItem);
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const review = {
      user: req.user._id,
      rating,
      comment,
    };

    restaurant.reviews.push(review);

    const ratings = restaurant.reviews.map((r) => r.rating);
    restaurant.rating = ratings.reduce((a, b) => a + b) / ratings.length;

    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
