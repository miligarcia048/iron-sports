const express = require('express');
const router = express.Router();

const ApiService = require('../services/news.service');
const apiService = new ApiService();

router.get("/news", async (req, res, next) => {
    try {
      await apiService.getAllNews();
      res.render("news/news");
    } catch (error) {
      next(error);
    }
});

module.exports = router;
