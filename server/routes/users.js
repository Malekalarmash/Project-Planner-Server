const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { User } = require('../models');
const bcrypt = require('bcrypt');

const logger = require('../logger')
const time = new Date()

router.use(express.urlencoded({ extended: false }))
router.use(bodyParser.json())


function output(req, level, message) {
    logger.log({
        method: req.method,
        path: req.path,
        level: level,
        parameters: req.params,
        body: req.body,
        message: message,
        timestamp: time.toLocaleString()
    })

}

router.all('*', (req, res, next) => {
    logger.info({
        method: req.method,
        path: req.path,
        parameters: req.params,
        body: req.body,
        timestamp: time.toLocaleString()
    })
    next()
})

// Create user 

router.post('/', async (req, res) => {
    const nameCheck = /^[a-zA-Z]+$/;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, email, password } = req.body;
    console.log(req.body)

    if (!name.match(nameCheck)) {
        output(req, 'error', 'Name should contain only letters')
        errors.push('Name should contain only letters');
    } else if (!email.match(emailCheck)) {
        output(req, 'error', 'Invalid email address')
        errors.push('Invalid email address');
    } else {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                res.status(500).send('Internal Server Error')
            } else {
                const post = await User.create({ name, email, password: hash });

                res.status(200).redirect('/projects');
            }
        });
    }

    // res.render('register.ejs', { errors: errors });
});

router.get('/')
module.exports = router;

