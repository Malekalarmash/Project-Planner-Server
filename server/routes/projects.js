const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { Project } = require('../models');


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

router.get('/', async (req, res) => {
    const project = await Project.findAll();
    res.send(project);

})
router.post('/', async (req, res) => {
    const { projectName, budget, client, timeline, description } = req.body;

    if (projectName === '') {
        output(req, 'error', 'Project name must be included')
        res.status(400).send('Add Project name')
    }
    else if (budget === '') {
        output(req, 'error', 'Budget must be included')
        res.status(400).send('Add Project budget')
    } else if (client === '') {
        output(req, 'error', 'Client must be included')
        res.status(400).send('Add Project client')
    } else {
        const newProject = {
            projectName: projectName,
            budget: budget,
            client: client,
            timeline: timeline,
            description: description
        }
        await Project.create(newProject)
        res.status(200).json({ message: 'Creating project was successful' });
    }

})
// Check for the validation of the req.body
router.delete('/', async (req, res) => {
    // Checks the id of the project
    // The ID comes from the body 
    const id = req.body.id
    const checkId = await Project.findOne({ where: { id: id } })
    console.log(checkId)
    if (isNaN(id)) {
        output(req, 'error', 'Project ID must be a number')
        res.status(400).send('Project ID must be a number ')
    } else if (checkId === null) {
        output(req, 'error', 'Project ID dosent exisit')
        res.status(400).send('Project ID dosent exisit')
    } else if (id === "") {
        output(req, 'error', 'Project ID Field is empty')
        res.status(400).send('Project ID Field is empty')
    }

    else {
        const deleteProject = await Project.destroy({ where: { id: id } })
        res.status(200).json({ message: 'Deleting project was successful' });
    }
})

router.put('/', async (req, res) => {
    // Checks the id of the project
    // The ID comes from the body 
    const id = req.body.id
    const checkProjectId = await Project.findAll({ where: { id: id } })
    const { projectName, budget, client, timeline, description } = req.body;
    const updatedProjectInfo = {
        projectName,
        budget,
        client,
        timeline,
        description
    }

    console.log("ID =>", id)
    if (checkProjectId < 1) {
        output(req, 'error', 'Project ID Must be a positive number')
        res.status(400).send('Project ID Must be a positive number')
    }
    else {
        const updatedProjects = await Project.update(updatedProjectInfo, {

            where: { id: id }
        })
        res.status(200).json({ message: 'Updating project was successful' });
    }
})

module.exports = router; 
