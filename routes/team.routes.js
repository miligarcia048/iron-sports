const express = require('express');
const router = express.Router();

router.get("/team", (req, res, next) => {
    try {
        res.render("team/team");

    } catch (error) {
        next(error)
    }
});

module.exports = router;
