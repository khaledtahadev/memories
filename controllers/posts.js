import Post from "../models/post.js";

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().lean().exec();
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

export const createPost = async (req, res) => {
	const postContent = req.body;
	const newPost = new Post({ ...postContent, creator: req.userId });

	try {
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		res.status(409).json({ error: error });
	}
};

export const updatePost = async (req, res) => {
	const postId = req.params.postId;
	const postChanges = req.body;

	try {
		const newPost = await Post.findByIdAndUpdate(postId, postChanges, {
			new: true,
		})
			.lean()
			.exec();
		res.send(newPost);
	} catch (error) {
		res.status(409).json({ error: error.message });
	}
};

export const deletePost = async (req, res) => {
	const id = req.params.postId;

	try {
		const removedPost = await Post.findByIdAndDelete(id).lean().exec();
		res.json(removedPost);
	} catch (error) {
		res.status(409).json({ error: error.message });
	}
};

export const likePost = async (req, res) => {
	const postId = req.params.postId;

	const incrementLike = {
		$inc: { likeCount: 1 },
		$push: { likes: req.userId },
	};

	const decrementLike = {
		$inc: { likeCount: -1 },
		$pull: { likes: req.userId },
	};

	try {
		const post = await Post.findById(postId).exec();
		const index = post.likes.findIndex(userId => userId === req.userId);

		let newPost;
		if (index === -1) {
			newPost = await Post.findByIdAndUpdate(postId, incrementLike, {
				new: true,
			})
				.lean()
				.exec();
		} else {
			newPost = await Post.findByIdAndUpdate(postId, decrementLike, {
				new: true,
			})
				.lean()
				.exec();
		}

		res.json(newPost);
	} catch (error) {
		res.status(409).json({ error: error.message });
	}
};

// https://www.restapitutorial.com/httpstatuscodes.html
