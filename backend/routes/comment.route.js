const express = require('express')
const router = new express.Router()
const commentController = require("../controllers/comment.controller");
const {authenticate} = require("../controllers/auth.controller");

router.post('/create', authenticate, commentController.createComment)

module.exports = router