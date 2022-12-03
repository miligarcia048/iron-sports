const express = require('express');
const router = express.Router();

const ApiService = require('../services/leagues.service');
const apiService = new ApiService();

router.get("/leagues", async (req, res, next) => {
    try {
        const allCompetitions = await apiService.getAllCompetitions();
        res.render("leagues/leagues" , { competitions: allCompetitions.data.competitions });
    } catch (error) {
        next(error)
    }
});

module.exports = router;