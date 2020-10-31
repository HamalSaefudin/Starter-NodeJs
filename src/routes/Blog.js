const express = require('express');

const router = express.Router()
const blogController = require('../controllers/Blog')

router.post('/post',blogController.postContent)

module.exports = router;