const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  "/login",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);


router.get("/me", auth, authController.getCurrentUser);


router.put(
  "/profile",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
    ],
  ],
  authController.updateProfile
);


router.post("/logout", auth, authController.logout);

module.exports = router;
