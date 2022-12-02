const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

module.exports = router;
