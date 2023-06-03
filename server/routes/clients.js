const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { Client } = require('../models');
const logger = require('../logger');
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

router.get('/', async (req, res) => {
    const clients = await Client.findAll();
    res.send(clients);

})
router.post('/', async (req, res) => {
    const { clientName, email,
        address, phoneNumber,
        project, task, budget } = req.body;

    if (clientName === '') {
        output(req, 'error', 'Client name must be included')
        res.status(400).send('Add Client name')
    }
    else if (budget === '') {
        output(req, 'error', 'Budget must be included')
        res.status(400).send('Add Project budget')
    } else if (email === '') {
        output(req, 'error', 'Client email must be included')
        res.status(400).send('Add client email')
    } else {
        const newClient = {
            clientName,
            email,
            address,
            phoneNumber,
            project,
            task,
            budget
        }
        await Client.create(newClient)
        res.status(200).json({ message: 'Client was successfully created' });

    }

})

router.delete('/', async (req, res) => {
    const id = req.body.id
    const checkId = Client.findAll({ where: { id: id } })
    console.log(id)
    if (isNaN(id)) {
        output(req, 'error', 'Client ID must be a number')
        res.status(400).send('Client ID must be a number ')
    }

    else {
        const deleteClient = await Client.destroy({ where: { id: id } })
        res.status(200).json({ message: 'Client was successfully deleted' });

    }
})

router.put('/', async (req, res) => {
    const id = req.body.id
    const checkClientId = await Client.findAll({ where: { id: id } })
    const { clientName, email,
        address, phoneNumber,
        project, task, budget } = req.body;
    const updatedClientInfo = {
        clientName,
        email,
        address,
        phoneNumber,
        project,
        task,
        budget
    }

    console.log(id)
    if (checkClientId < 1) {
        output(req, 'error', 'Client ID Must be a positive number')
        res.status(400).send('Client ID Must be a positive number')
    }
    else {
        const updatedProjects = await Client.update(updatedClientInfo, {
            where: { id: id }
        })
        res.status(200).json({ message: 'Client was successfully created' });
    }
})

module.exports = router
