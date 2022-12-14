// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("unlessEquals", function (arg1, arg2, options) {
  return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("dateFormat", require("handlebars-dateformat"));

hbs.registerHelper("length", function (v1, v2, options) {
  if (v1.length > v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper("isValueInKey", function (array, value, key, options) {
    return array.find(el => el[key] === value)
      ? options.fn(this)
      : options.inverse(this);
  });

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);
require("./config/passport.config");

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "iron-sports";

app.locals.appTitle = `${capitalize(projectName)}`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const leagueRoutes = require("./routes/leagues.routes");
const newsRoutes = require("./routes/news.routes");
const teamRoutes = require("./routes/team.routes");
const authRoutes = require("./routes/auth.routes");
const favoritesRoutes = require("./routes/favorites.routes");

app.use("/", indexRoutes);
app.use("/", leagueRoutes);
app.use("/", newsRoutes);
app.use("/", teamRoutes);
app.use("/", authRoutes);
app.use("/", favoritesRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
