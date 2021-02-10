const express = require('express')

const router = express.Router()

const authController = require('../controllers/Authentication')

router.post('/register', authController.register)
router.post('/Login', authController.login)

module.exports = router;