const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

const randomNumber = Math.floor(Math.random() * 100);


const ApiService = require('../services/leagues.service');
const apiService = new ApiService();


/* GET home page */
router.get("/", async (req, res, next) => {
  const randomPlayer = await apiService.getOnePlayer(randomNumber);
  console.log(randomPlayer);
  res.render("home");
});

module.exports = router;
