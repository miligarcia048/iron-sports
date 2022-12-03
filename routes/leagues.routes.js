const express = require('express');
const router = express.Router();

const ApiService = require('../services/leagues.service');
const apiService = new ApiService();

router.get("/leagues", async (req, res, next) => {
    try {
        const allLeagues = await apiService.getAllLeagues();
        res.render("leagues/leagues" , { leagues: allLeagues });
    } catch (error) {
        next(error)
    }
});

module.exports = router;