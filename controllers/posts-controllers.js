const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

let DUMMY_POSTS = [
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
  const post = DUMMY_POSTS.find(p => {
  	return p.id === postId;
  });
  if (!post) {
    throw new HttpError('Could not find a post for the provided id.', 404);
  }

  res.json({post});
}

const getPostsByUserId =  (req, res, next) => {
	const userId = req.params.uid;
	const posts = DUMMY_POSTS.filter(p => {
		return p.uid === userId;
	})
  if (!posts || posts.length === 0) {
    return next(
      new HttpError('Could not find posts for the provided user.', 404)
    );
  }

	res.json({posts})
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

  DUMMY_POSTS.push(createdPost); //unshift(createdPost)

  res.status(201).json({place: createdPost});
};

const updatePost = (req, res, next) => {
  const { title, description } = req.body;
  const postId = req.params.pid;

  const updatedPost = { ...DUMMY_POSTS.find(p => p.id === postId) };
  const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);
  updatedPost.title = title;
  updatedPost.description = description;

  DUMMY_POSTS[postIndex] = updatedPost;

  res.status(200).json({post: updatedPost});
};

const deletePost = (req, res, next) => {
  const postId = req.params.pid;
  DUMMY_POSTS = DUMMY_POSTS.filter(p => p.id !== postId);
  res.status(200).json({ message: 'Deleted place.' });
};


exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
