const user = require('../controllers/user.controller')
var router = require("express").Router()

router.post('/', user.create)
router.put('/:id', user.update)
router.delete('/:id', user.delete)
router.get('/:id', user.findById)
router.get('/', user.findAll)

module.exports = router
