const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");
const { validationResult } = require("express-validator");

exports.getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate("user", "name avatar")
      .sort({ date: -1 });

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate("restaurant", "name image")
      .sort({ date: -1 });

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const restaurant = await Restaurant.findById(req.body.restaurant);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    const existingReview = await Review.findOne({
      user: req.user.id,
      restaurant: req.body.restaurant,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ msg: "You have already reviewed this restaurant" });
    }

    const newReview = new Review({
      user: req.user.id,
      restaurant: req.body.restaurant,
      rating: req.body.rating,
      comment: req.body.comment,
      order: req.body.order,
    });

    const review = await newReview.save();
    await review.populate("user", "name avatar");
    await review.populate("restaurant", "name image");

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;

    await review.save();
    await review.populate("user", "name avatar");
    await review.populate("restaurant", "name image");

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await review.remove();
    res.json({ msg: "Review removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
