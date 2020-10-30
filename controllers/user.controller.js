const db = require('../models')
const { body, validationResult } = require('express-validator')
const User = db.User


exports.create = (req, res) => {

    body('name').not().isEmpty()
    body('surname').not().isEmpty()
    body('password').not().isEmpty()
    body('date').isDate()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const user = {
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        birthday: req.body.birthday
    };
    User.create(user)
        .then(data => {
            return res.status(200).json({data: data})
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error during creating'})
        });
};

exports.update = (req, res) => {

    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                const user = User.findByPk(id).then(data => {
                    if (data) {
                        return res.status(200).json({data: data})
                    }
                })
            } else {
                return res.status(404).json({ error: 'User not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error during updating'})
        });
};

exports.delete = (req, res) => {
    const id = req.params.id

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            console.log(num == 1)
            if (num == 1) {
                return res.status(204).send()
            } else {
                return res.status(404).json({ error: 'User not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error during deleting'})
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
        .then(data => {
            if (data) {
                return res.status(200).json({ data: data})
            } else {
                return res.status(404).json({ error: 'User not found'})
            }
        })
        .catch(err => {
            return res.status(404).json({ error: 'User not found'})
        });
};
