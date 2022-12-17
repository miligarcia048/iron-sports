const express = require("express");
const router = express.Router();

const Favorites = require("../models/Favorites.model");
const User = require("../models/User.model");

const { isLoggedIn } = require("../middleware/route-guard");

router.get("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    let currentUserPopulated = await User.findById(
      req.user._id
    ).populate("favorites");
    const favourites = currentUserPopulated.favorites;
    console.log(req.user._id);
    console.log(favourites);

    res.render("favorites", {
      favourites,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const { name, flag } = req.body;
    let favoriteLeague = await Favorites.findOne({
      name,
    });
    if (!favoriteLeague) {
      favoriteLeague = await Favorites.create({
        name,
        flag,
      });
    }
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          favorites: favoriteLeague._id,
        },
      },
      {
        new: true,
      }
    );
    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
