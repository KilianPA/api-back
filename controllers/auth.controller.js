const bcrypt = require('bcryptjs')
const User = require('../controllers/user.controller')
const jwt = require('jsonwebtoken');
let {jwtOptions} = require('../passport/jwtSetup')


exports.login = async (res, email, password) => {
    let user = await User.findByParams({email: email})
    if (!user) {
        return res.status(401).json({message: 'Mauvais email ou mot de passe'})
    } else {
        bcrypt.compare(password, user.password, (err, status) => {
            if (err) throw err
            if (status) {
                let payload = { id: user.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.json({ token: token });
            } else {
                return res.status(401).json({message: 'Mauvais email ou mot de passe'})
            }
        });
    }
}
