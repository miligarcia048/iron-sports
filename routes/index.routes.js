const express = require("express");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

const randomNumber = Math.floor(Math.random() * 10000);
const randomNumber2 = Math.floor(Math.random() * 10000);
const randomNumber3 = Math.floor(Math.random() * 10000);

const ApiService = require("../services/leagues.service");
const apiService = new ApiService();

const ApiService2 = require("../services/images.service");
const apiService2 = new ApiService2();

/* GET home page */
router.get("/", async (req, res, next) => {
  const randomPlayer = await apiService.getOnePlayer(randomNumber);
  const randomPlayer2 = await apiService.getOnePlayer(randomNumber2);
  const randomPlayer3 = await apiService.getOnePlayer(randomNumber3);
  // console.log(randomPlayer);
  const imageRandomPlayer = await apiService2.getPlayerImage(
    randomPlayer.data.name
  );
  const imageRandomPlayer2 = await apiService2.getPlayerImage(
    randomPlayer2.data.name
  );
  const imageRandomPlayer3 = await apiService2.getPlayerImage(
    randomPlayer3.data.name
  );
  console.log(imageRandomPlayer.data.data[1]);
  res.render("home", {
    randomPlayer: randomPlayer.data,
    randomPlayerImage: imageRandomPlayer.data.data[0],
    randomPlayer2: randomPlayer2.data,
    randomPlayerImage2: imageRandomPlayer2.data.data[0],
    randomPlayer3: randomPlayer3.data,
    randomPlayerImage3: imageRandomPlayer3.data.data[0],
  });
});

module.exports = router;
