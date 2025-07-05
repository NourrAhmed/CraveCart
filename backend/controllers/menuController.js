const Menu = require("../models/Menu");
const Restaurant = require("../models/Restaurant");
const { validationResult } = require("express-validator");

exports.getRestaurantMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find({
      restaurant: req.params.restaurantId,
    }).populate("restaurant", "name address");

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ msg: "No menu items found" });
    }

    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createMenu = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const restaurant = await Restaurant.findById(req.body.restaurant);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const menu = new Menu({
      restaurant: req.body.restaurant,
      items: req.body.items,
      categories: [...new Set(req.body.items.map((item) => item.category))],
    });

    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.updateMenu = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const restaurant = await Restaurant.findById(menu.restaurant);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    menu.items = req.body.items;
    menu.categories = [...new Set(req.body.items.map((item) => item.category))];
    menu.lastUpdated = Date.now();

    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const restaurant = await Restaurant.findById(menu.restaurant);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await menu.remove();
    res.json({ msg: "Menu removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addMenuItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const menu = await Menu.findById(req.params.menuId);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const restaurant = await Restaurant.findById(menu.restaurant);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const newItem = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image || "",
      availability:
        req.body.availability !== undefined ? req.body.availability : true,
    };

    menu.items.push(newItem);
    if (!menu.categories.includes(req.body.category)) {
      menu.categories.push(req.body.category);
    }

    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.removeMenuItem = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    const restaurant = await Restaurant.findById(menu.restaurant);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    menu.items = menu.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    const remainingCategories = new Set(
      menu.items.map((item) => item.category)
    );
    menu.categories = Array.from(remainingCategories);

    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
