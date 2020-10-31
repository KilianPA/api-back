const express = require("express")
const bodyParser = require("body-parser")

const user = require('./routes/user.routes')
const auth = require('./routes/auth.routes')
const app = express()

const User = require('./models/user')


const passport = require('passport')
const {strategy} = require('./passport/jwtSetup')
// use the strategy
passport.use(strategy);
app.use(passport.initialize());


// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my super api." })
})

// Add Users routes
app.use('/users', [passport.authenticate('jwt', { session: false })], user)
// Add Auth routes
app.use('/auth', auth)

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})
