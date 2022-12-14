const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport");
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");
const { update } = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');


router.get("/signup", (req, res, next) => {
  try {
    res.render("auth/signup");
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.render("auth/signup", {
        errorMessage: "All fields are required!",
      });
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm;
    if (!passwordRegex.test(password)) {
      return res.status(500).render("auth/signup", {
        errorMessage:
          "Password needs to be at least 6 characters and must contain one uppercase letter, one lowercase letter, a number and a special character.",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, passwordHash });
    req.user = user;
    req.login(user, (error) => {
      if (error) {
        //saving the session went wrong
        return next(error);
      }

      req.user = user;
      //Everything went good, redirecting the user
      res.redirect("/");
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage: "Username or email already in use.",
      });
    } else {
      next(error);
    }
  }
});

router.get("/login", (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return res.render("auth/login", {
      errorMessage: "Please enter both email and password.",
    });
  }
  passport.authenticate("local", (error, user, failureDetails) => {
    if (error) {
      //something went wrong authenticating the user
      return next(error);
    }
    if (!user) {
      //Unauthorized, 'failureDetails' will contain the reason
      return res.render("auth/login", {
        // {errorMessage:failureDetails.message} - to bring the message from the passport config
        errorMessage: "Wrong password or username",
      });
    }
    req.login(user, (error) => {
      if (error) {
        //saving the session went wrong
        return next(error);
      }

      req.user = user;
      //Everything went good, redirecting the user
      res.redirect("/");
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      next(error);
    }

    res.redirect("/");
  });
});

router.get("/edit", isLoggedIn, (req, res, next) => {
  try {
    res.render("auth/edit");
  } catch (error) {
    next(error);
  }
});

router.post("/edit", fileUploader.single('picture_url'), isLoggedIn, async (req, res, next) => {
  try {
    const { username, email, oldPassword, newPassword, confirmedNewPassword } =
      req.body;
    const userID = req.user._id;
    let passwordHash = "";
    const updateUser = {};

    if (username) {
      updateUser.username = username;
    }
    if (email) {
      updateUser.email = email;
    }
  
    if(req.file) {
      updateUser.picture_url = req.file.path;
    }

    if (oldPassword && newPassword && confirmedNewPassword) {
      if (newPassword === confirmedNewPassword) {
        try {
          
          // const passwordHash = newPassword;

          if (bcrypt.compareSync(oldPassword, req.user.passwordHash)) {
            const salt = await bcrypt.genSalt(saltRounds);
            passwordHash = await bcrypt.hash(newPassword, salt);
          }
        } catch (error) {
        }
      } else {
      }
    }
    if (passwordHash) {
      updateUser.passwordHash = passwordHash;
    }
    const user = await User.findByIdAndUpdate(userID, updateUser);
    req.user = user;
    res.redirect("/edit");
  } catch (error) {
    next(error);
  }
});

//Routes for google auth

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.APP_HOSTNAME}/`,
    failureRedirect: `${process.env.APP_HOSTNAME}/login`,
  })
);

module.exports = router;
