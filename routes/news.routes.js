const express = require('express');
const router = express.Router();

const ApiService = require('../services/news.service');
const apiService = new ApiService();

router.get("/news", async (req, res, next) => {
    try {
      const allNews = await apiService.getAllNews();
      console.log(allNews)
      res.render("news/news", { news: allNews });
    } catch (error) {
      next(error);
    }
});

router.get("/news/:newsName", async (req, res, next) => {
    try {
      const { newsName } = req.params;
      const allNews = await apiService.getAllNews();
      res.render("news/news", { news: allNews });
    } catch (error) {
      next(error);
    }
});

module.exports = router;
