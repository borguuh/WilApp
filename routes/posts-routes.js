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
  res.json({post});
});

module.exports = router;