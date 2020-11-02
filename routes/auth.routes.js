const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const Auth = require('../controllers/auth.controller')

router.post('/login', async function (req, res, next) {
    const {email, password} = req.body;
    if (email && password) {
        Auth.login(res, email, password)
    } else {
        res.status(401).json({
            msg: 'Passwordisincorrect'
        })
    }
})


module.exports = router;
