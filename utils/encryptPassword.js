const bcrypt = require("bcryptjs");

exports.encrypt = (password) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
