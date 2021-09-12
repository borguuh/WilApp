const HttpError = require('../models/http-error');

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

const getPlaceById = (req, res, next) => {
  const postId = req.params.pid;
  const post = DUMMY_POST.find(p => {
  	return p.id === postId;
  });
  if (!post) {
    throw new HttpError('Could not find a post for the provided id.', 404);
  }

  res.json({post});
}


const getPlaceByUserId =  (req, res, next) => {
	const userPost = req.params.uid;
	const post = DUMMY_POST.find(p => {
		return p.author.uid === userPost;
	})
  if (!post) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

	res.json({post})
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
