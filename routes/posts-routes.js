const express = require('express');

const postsControllers = require('../controllers/posts-controllers');

const router = express.Router();

router.get('/:pid', postsControllers.getPostById);

router.get('/users/:uid', postsControllers.getPostsByUserId);

router.post('/', postsControllers.createPost);

router.patch('/:pid', postsControllers.updatePost);

router.delete('/:pid', postsControllers.deletePost);

module.exports = router;
