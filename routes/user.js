const express = require('express');
const router = express.Router();
var UserController = require('../controllers/userController')

router.get('/getBlogList', UserController.getBlogList);
router.post('/createBlog', UserController.createBlog);
router.post('/updateBlog', UserController.updateBlog);
router.post('/deleteBlog', UserController.deleteBlog);
router.get('/viewBlog/:id', UserController.getBlogById);

module.exports = router;