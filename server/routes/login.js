const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const passport = require("passport");

const logger = require('../logger');
const { OK } = require('sqlite3');
const time = new Date();

router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.json());

function output(req, level, message) {
  logger.log({
    method: req.method,
    path: req.path,
    level: level,
    parameters: req.params,
    body: req.body,
    message: message,
    timestamp: time.toLocaleString()
  });
}

router.all('*', (req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    parameters: req.params,
    body: req.body,
    timestamp: time.toLocaleString()
  });
  next();
});

// Middleware function for authentication
function authenticateToken(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return res.json({ error: "An error occurred" });
    }
    if (!user) {
      return res.json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}

//create the createToken function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Malek secret", {
    expiresIn: maxAge,
  });
};

router.post('/', async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const user = await User.findOne({ where: { emailAddress: emailAddress } });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = createToken(user.id);
        const data = {
          id: user.id,
          name: user.name,
          emailAddress: user.emailAddress,
          jwt: token
        };
        return res.json({ status: OK, data });
      } else {
        return res.status(400).json({ error: "Incorrect Password" });
    }
    } else {
      return res.status(400).json({ error: "This email is not registered" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ error: "An error occurred" });
  }
});

// Protected route example
router.get('/', authenticateToken, (req, res) => {
  // Only authenticated users can access this route
  const userId = req.user.id;
  return res.json({ message: `Protected route accessed by user with ID: ${userId}` });
});

module.exports = router;
