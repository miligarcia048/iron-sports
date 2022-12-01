const axios = require("axios");
const API_KEY = process.env.NEWS_API_KEY;

const params = {
  country: "gb",
  category: "sports",
  apiKey: API_KEY,
};

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://newsapi.org/v2/top-headlines",
      headers: { "accept-encoding": "*" },
    });
  }

  getAllNews = () => {
    return this.api
      .get(this.baseURL, { params: params })
      .then((response) => {
        console.log("data", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

module.exports = ApiService;
