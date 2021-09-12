const express = require('express');

const router = express.Router();

const DUMMY_POST = [
	{
		id: 'p1',
		title: 'my first post',
		description: 'first post',
		body: 'OK, this is just to test, right?',
		createdAt: '2021-08-18T03:22:56.637Z',
		updatedAt: '2021-08-18T03:23:56.637Z',
		author: {
			uid: 'u1',
			username: "Borguuh",
			img: 'https://i.stack.imgur.com/xHWG8.jpg'
		}
	}
]

router.get('/:pid', (req, res, next) => {
  const postId = req.params.pid;
  const post = DUMMY_POST.find(p => {
  	return p.id === postId;
  });
  if (!post) {
    const error = new Error('Could not find a post for the provided id.');
    error.code = 404;
    throw error;
  }

  res.json({post});
});

router.get('/users/:uid', (req, res, next) => {
	const userPost = req.params.uid;
	const post = DUMMY_POST.find(p => {
		return p.author.uid === userPost;
	})
  if (!post) {
    const error = new Error('Could not find a post for the provided user id.');
    error.code = 404;
    return next(error);
  }

	res.json({post})
}) 

module.exports = router;