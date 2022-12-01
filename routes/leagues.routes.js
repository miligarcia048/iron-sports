const express = require('express');
const router = express.Router();

router.get("/leagues", (req, res, next) => {
    try {
        res.render("leagues/leagues");

    } catch (error) {
        next(error)
    }
});

module.exports = router;
