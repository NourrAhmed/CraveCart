const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
  "/",
  [
    auth,
    upload.single("image"),
    [
      check("name", "Name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  restaurantController.createRestaurant
);

router.get("/", restaurantController.getAllRestaurants);

router.get("/:id", restaurantController.getRestaurantById);

router.put(
  "/:id",
  [auth, upload.single("image")],
  restaurantController.updateRestaurant
);

router.delete("/:id", auth, restaurantController.deleteRestaurant);

router.post(
  "/:id/menu",
  [
    auth,
    upload.single("image"),
    [
      check("name", "Item name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("price", "Price is required").isNumeric(),
      check("category", "Category is required").not().isEmpty(),
    ],
  ],
  restaurantController.addMenuItem
);

router.post(
  "/:id/reviews",
  [
    auth,
    [
      check("rating", "Rating is required")
        .isNumeric()
        .isInt({ min: 1, max: 5 }),
      check("comment", "Comment is required").not().isEmpty(),
    ],
  ],
  restaurantController.addReview
);

module.exports = router;
