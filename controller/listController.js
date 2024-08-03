const db = require('../model');
const { Op } = require('sequelize')

const List = db.list;
const Task = db.task;

const createList = async (req, res) => {
    // console.log('req.body ', req.body);
    const { listName } = req.body;

    const list = await List.build({ listName });
    await list.save();

    res.status(201).json(list.toJSON(list));
}

const getLists = async (req, res) => {
    const data = await List.findAll({
        include: Task,
        order: [
            ['id', 'ASC'],
            [ {model: Task}, 'id', 'ASC'],
        ],
        attributes: ['id', 'listName']
    });
    res.status(200).json({ data });
}

const deleteList = async (req, res) => {
    const data = await List.destroy({
        where: {
            id: {
                [Op.eq]: req.params.id
            }
        }
    });
    res.status(200).json({ message: "List deleted." });
}


module.exports = {
    createList,
    getLists,
    deleteList
}