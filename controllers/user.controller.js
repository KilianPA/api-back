const db = require('../models')
const { encrypt } = require('../utils/encryptPassword')
const { body, validationResult } = require('express-validator')
const User = db.User


exports.create = (req, res) => {

    body('name').not().isEmpty()
    body('email').not().isEmpty().isEmail()
    body('surname').not().isEmpty()
    body('password').not().isEmpty()
    body('date').isDate()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        surname: req.body.surname,
        password: encrypt(req.body.password),
        birthday: req.body.birthday
    };

    User.create(user)
        .then(data => {
            return res.status(200).json({data: data})
        })
        .catch(err => {
            return res.status(500).json({ error: err})
        });
};

exports.update = (req, res) => {

    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                User.findByPk(id).then(data => {
                    if (data) {
                        return res.status(200).json({data: data})
                    }
                })
            } else {
                return res.status(404).json({ error: 'User not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err})
        });
};

exports.delete = (req, res) => {
    const id = req.params.id

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                return res.status(204).send()
            } else {
                return res.status(404).json({ error: 'User not found'})
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err})
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            return res.status(500).json({ error: err})
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
            return res.status(500).json({ error: err})
        });
};

exports.findByParams = async (req, res) => {
    return await User.findOne({where: req})
}
