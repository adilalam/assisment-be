const db = require('../model');
const { Op } = require('sequelize')

const Task = db.task;

const createTask = async (req, res) => {
    // console.log('req.body ', req.body);
    const { taskName, list_id } = req.body;

    const task = await Task.build({ taskName, list_id });
    await task.save();

    res.status(201).json(task.toJSON(task));
}

const deleteTask = async (req, res) => {
    
    const data = await Task.destroy({
        where: {
            id: {
                [Op.eq]: req.params.id
            }
        }
    });
    res.status(200).json({ message: "Task deleted." });
}

const completeTask = async (req, res) => {
    const { isCompleted } = req.body;
    const data = await Task.update({isCompleted: !isCompleted}, {
        where: {
            id: {
                [Op.eq]: req.params.id
            }
        }
    });
    res.status(200).json({ message: "Task updated." });
}


module.exports = {
    createTask,
    deleteTask,
    completeTask
}