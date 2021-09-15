const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const DUMMY_POST = [
	{
		id: 'p1',
		title: 'my first post',
		description: 'first post',
		body: 'OK, this is just to test, right?',
		createdAt: '2021-08-18T03:22:56.637Z',
		updatedAt: '2021-08-18T03:23:56.637Z',
		uid: 'u1',
		username: 'borguuh'
	}
]

const getPostById = (req, res, next) => {
  const postId = req.params.pid;
  const post = DUMMY_POST.find(p => {
  	return p.id === postId;
  });
  if (!post) {
    throw new HttpError('Could not find a post for the provided id.', 404);
  }

  res.json({post});
}

const getPostByUserId =  (req, res, next) => {
	const userPost = req.params.uid;
	const post = DUMMY_POST.find(p => {
		return p.uid === userPost;
	})
  if (!post) {
    return next(
      new HttpError('Could not find a post for the provided user id.', 404)
    );
  }

	res.json({post})
};

const createPost = (req, res, next) => {
  const { id, title, body, description, createdAt, updatedAt, uid, username } = req.body;
  
  const createdPost = {
    id: uuid(),
    title,
    body,
    description,
    createdAt,
    updatedAt,
    uid,
    username
  };

  DUMMY_POST.push(createdPost); //unshift(createdPost)

  res.status(201).json({place: createdPost});
};

const updatePost = (req, res, next) => {
  const { title, description } = req.body;
  const postId = req.params.pid;

  const updatedPost = { ...DUMMY_POST.find(p => p.id === postId) };
  const postIndex = DUMMY_POST.findIndex(p => p.id === postId);
  updatedPost.title = title;
  updatedPost.description = description;

  DUMMY_POST[postIndex] = updatedPost;

  res.status(200).json({post: updatedPost});
};

const deletePost = (req, res, next) => {};


exports.getPostById = getPostById;
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
