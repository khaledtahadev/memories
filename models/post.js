import mongoose from "mongoose";

// definition schema
const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: String,
		name: String,
		creator: String,
		tags: [String],
		selectedFile: String,
		likes: { type: [String], default: [] },
		likeCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
