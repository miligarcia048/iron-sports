const express = require("express");
const router = express.Router();

const Favorites = require('../models/Favorites.model');
const User = require('../models/User.model');

const { isLoggedIn } = require('../middleware/route-guard');

router.get("/favorites", isLoggedIn, async (req, res, next) => {
    try {
        let favourites = await Favorites.find()
        res.render("favorites", {
            favourites
        })
    } catch (error) {
        next(error);
    }
});

router.post("/favorites", isLoggedIn, async (req, res, next) => {
    try {
        const { name, flag } = req.body;
        const newFav = await Favorites.create({name, flag});
        User.findByIdAndUpdate(req.session.currentUser._id, {
            $push: {
                favorites: newFav._id
            }
        })
        res.redirect("/favorites")
    } catch (error) {
        next(error);
    }
});

module.exports = router;