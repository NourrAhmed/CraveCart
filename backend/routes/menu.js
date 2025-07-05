const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const menuController = require("../controllers/menuController");
const admin = require("../middleware/admin");
const Menu = require("../models/Menu");

router.get("/restaurant/:restaurantId", menuController.getRestaurantMenu);

router.post(
  "/",
  [
    auth,
    [
      check("restaurant", "Restaurant ID is required").not().isEmpty(),
      check("items", "Menu items are required").isArray(),
      check("items.*.name", "Item name is required").not().isEmpty(),
      check(
        "items.*.price",
        "Item price is required and must be positive"
      ).isFloat({ min: 0 }),
      check("items.*.category", "Item category is required").isIn([
        "appetizer",
        "main course",
        "dessert",
        "beverage",
        "side dish",
      ]),
    ],
  ],
  menuController.createMenu
);

router.put(
  "/:id",
  [
    auth,
    [
      check("items", "Menu items are required").isArray(),
      check("items.*.name", "Item name is required").not().isEmpty(),
      check(
        "items.*.price",
        "Item price is required and must be positive"
      ).isFloat({ min: 0 }),
      check("items.*.category", "Item category is required").isIn([
        "appetizer",
        "main course",
        "dessert",
        "beverage",
        "side dish",
      ]),
    ],
  ],
  menuController.updateMenu
);

router.delete("/:id", auth, menuController.deleteMenu);

router.put(
  "/item/:menuId",
  [
    auth,
    [
      check("name", "Item name is required").not().isEmpty(),
      check("price", "Item price is required and must be positive").isFloat({
        min: 0,
      }),
      check("category", "Item category is required").isIn([
        "appetizer",
        "main course",
        "dessert",
        "beverage",
        "side dish",
      ]),
    ],
  ],
  menuController.addMenuItem
);

router.delete("/item/:menuId/:itemId", auth, menuController.removeMenuItem);

router.get("/:restaurantId", auth, async (req, res) => {
  try {
    const menuItems = await Menu.find({ restaurant: req.params.restaurantId });
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.post("/:restaurantId", [auth, admin], async (req, res) => {
  try {
    const { name, description, price, category, availability } = req.body;

    const newMenuItem = new Menu({
      restaurant: req.params.restaurantId,
      name,
      description,
      price,
      category,
      availability,
    });

    const menuItem = await newMenuItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:restaurantId/:itemId", [auth, admin], async (req, res) => {
  try {
    const { name, description, price, category, availability } = req.body;
    const menuItem = await Menu.findById(req.params.itemId);

    if (!menuItem) {
      return res.status(404).json({ msg: "Menu item not found" });
    }

    if (menuItem.restaurant.toString() !== req.params.restaurantId) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.availability =
      availability !== undefined ? availability : menuItem.availability;

    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:restaurantId/:itemId", [auth, admin], async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.itemId);
    if (!menuItem) {
      return res.status(404).json({ msg: "Menu item not found" });
    }

    if (menuItem.restaurant.toString() !== req.params.restaurantId) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Menu.findByIdAndDelete(req.params.itemId);
    res.json({ msg: "Menu item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
