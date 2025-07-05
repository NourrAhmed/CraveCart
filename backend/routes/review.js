const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const reviewController = require("../controllers/reviewController");

router.get("/restaurant/:restaurantId", reviewController.getRestaurantReviews);


router.get("/user/:userId", auth, reviewController.getUserReviews);


router.post(
  "/",
  [
    auth,
    [
      check("restaurant", "Restaurant ID is required").not().isEmpty(),
      check("rating", "Rating is required and must be between 1 and 5").isInt({
        min: 1,
        max: 5,
      }),
      check("comment", "Comment is required").not().isEmpty(),
    ],
  ],
  reviewController.createReview
);


router.put(
  "/:id",
  [
    auth,
    [
      check("rating", "Rating is required and must be between 1 and 5").isInt({
        min: 1,
        max: 5,
      }),
      check("comment", "Comment is required").not().isEmpty(),
    ],
  ],
  reviewController.updateReview
);

router.delete("/:id", auth, reviewController.deleteReview);

module.exports = router;
