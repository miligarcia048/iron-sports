const express = require('express');
const router = express.Router();

router.get("/leagues", async (req, res, next) => {
    try {
			 const allLeagues = await apiService.getAllLEagues();
        res.render("leagues/leagues" , {leagues: allLeagues });


    } catch (error) {
        next(error)
    }
});

module.exports = router;
