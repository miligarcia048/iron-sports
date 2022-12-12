const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

const randomNumber = Math.floor(Math.random() * 100);

const ApiService = require("../services/leagues.service");
const apiService = new ApiService();

const ApiService2 = require("../services/images.service");
const apiService2 = new ApiService2();

/* GET home page */
router.get("/", async (req, res, next) => {
  const randomPlayer = await apiService.getOnePlayer(randomNumber);
  // console.log(randomPlayer);
  const imageRandomPlayer = await apiService2.getPlayerImage(
    randomPlayer.data.name
  );
  console.log(imageRandomPlayer.data.data[1]);
  res.render("home", { randomPlayer: randomPlayer.data,
    randomPlayerImage: imageRandomPlayer.data.data[0]
  });
});

module.exports = router;
