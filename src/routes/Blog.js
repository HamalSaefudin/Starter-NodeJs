const express = require('express');

const router = express.Router()
const blogController = require('../controllers/Blog')
const {body} = require('express-validator')

router.post('/post',
[
    body('title').isLength({min: 5}).withMessage('Input title tidak sesuai'),
    body('body').isLength({min: 5}).withMessage('Input body tidak sesuai'),
], blogController.postContent)

module.exports = router;