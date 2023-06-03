const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { Task } = require('../models');
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
    const tasks = await Task.findAll();
    res.send(tasks);

})
router.post('/', async (req, res) => {
    const { taskName, client,
        project, isDone,
        dueDate, description } = req.body;

    if (taskName === '') {
        output(req, 'error', 'Task name must be included')
        res.status(400).send('Add Task name')
    }
    else if (taskName === '') {
        output(req, 'error', 'Budget must be included')
        res.status(400).send('Add Project budget')
    } else if (client === '') {
        output(req, 'error', 'Task email must be included')
        res.status(400).send('Add Task email')
    } else {
        const newtask = {
            taskName,
            client,
            project,
            isDone,
            dueDate,
            description
        }
        await Task.create(newtask)
        res.status(200).json({ message: 'Creating task was successful' });
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const checkId = await Task.findAll({ where: { id: id } })
    console.log(id)
    if (isNaN(id)) {
        output(req, 'error', 'Task ID must be a number')
        res.status(200).json({ message: 'Deleting task was successful' });
    }

    else {
        const deleteTask = await Task.destroy({ where: { id: id } })
        res.status(200).json({ message: 'Deleting task was successful' });
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const checkTaskId = await Task.findOne({ where: { id: id } })
    const { taskName,
        client,
        project,
        isDone,
        dueDate,
        description, isInProgres } = req.body;
    const updatedTaskInfo = {
        taskName,
        client,
        project,
        isDone,
        dueDate,
        description,
        isInProgres
    }
    if (!checkTaskId) {
        output(req, 'error', 'Task not found');
        res.status(404).send('Task not found');
        return;
      }
    else {
        const updatedTask = await Task.update(updatedTaskInfo, {

            where: { id: id }
        })
        res.status(200).send(updatedTask)
    }
})
router.put('/:id', async (req, res) => {
    const { id, isDone } = req.body;
    
    try {
      const task = await Task.findOne({ where: { id } });
  
      if (!task) {
        output(req, 'error', 'Task not found');
        res.status(404).send('Task not found');
        return;
      }
  
      const updatedTask = await task.update({ isDone });
  
      res.status(200).send(updatedTask);
    } catch (error) {
      console.log(error);
      output(req, 'error', 'Failed to update task');
      res.status(500).send('Failed to update task');
    }
  });

module.exports = router; 
