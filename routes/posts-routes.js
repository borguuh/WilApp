const express = require('express');

const postsControllers = require('../controllers/posts-controllers');

const router = express.Router();

router.get('/:pid', postsControllers.getPlaceById);

router.get('/users/:uid', postsControllers.getPlaceByUserId) 

module.exports = router;