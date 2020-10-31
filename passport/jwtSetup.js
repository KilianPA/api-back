const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const passportJWT = require('passport-jwt')
const User = require('../controllers/user.controller')
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = crypto.randomBytes(256)

exports.strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    let user = User.findByParams({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

exports.jwtOptions = jwtOptions

