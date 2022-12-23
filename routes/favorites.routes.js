const express = require("express");
const router = express.Router();

const Favorites = require("../models/Favorites.model");
const Teams = require("../models/Teams.model");
const Players = require("../models/Players.model");
const User = require("../models/User.model");

const { isLoggedIn } = require("../middleware/route-guard");

// Create

router.get("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    let currentUserPopulated = await User.findById(req.user._id).populate(
      "favorites teams players"
    );

    const favourites = currentUserPopulated.favorites;
    const teams = currentUserPopulated.teams;
    const players = currentUserPopulated.players;

    console.log(req.user._id);
    console.log(favourites);
    console.log(teams);

    res.render("favorites", {
      favourites,
      teams,
      players,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body)
    const { flag, name, id } = req.body;
    let favoriteLeague = await Favorites.findOne({
      name,
    });
    console.log(favoriteLeague)
    if (!favoriteLeague) {
      favoriteLeague = await Favorites.create({
        id,
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

router.post("/favorites/teams", isLoggedIn, async (req, res, next) => {
  try {
    const { name, flag, id} = req.body;

    let favoriteTeam = await Teams.findOne({
      name,
    });

    if (!favoriteTeam) {
      favoriteTeam = await Teams.create({
        id,
        name,
        flag,
      });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          teams: favoriteTeam._id,
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

router.post("/favorites/players", isLoggedIn, async (req, res, next) => {
  try {
    const { id, name, flag } = req.body;

    let favoritePlayer = await Players.findOne({
      name,
    });

    if (!favoritePlayer) {
      favoritePlayer = await Players.create({
        id,
        name,
        flag,
      });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          players: favoritePlayer._id,
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

// Delete Leagues

router.post("/favorites/delete", async (req, res, next) => {
  try {
    const { name } = req.body;

    let favoriteLeague = await Favorites.findOne({
      name,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        favorites: favoriteLeague._id,
      },
    });

    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

router.post("/favorites/teams/delete", async (req, res, next) => {
  try {
    const { name } = req.body;

    let favoriteTeam = await Teams.findOne({
      name,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        teams: favoriteTeam._id,
      },
    });

    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

router.post("/favorites/players/delete", async (req, res, next) => {
  try {
    const { name } = req.body;

    let favoritePlayer = await Players.findOne({
      name,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        players: favoritePlayer._id,
      },
    });

    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
