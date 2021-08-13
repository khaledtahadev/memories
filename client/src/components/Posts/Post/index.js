import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@material-ui/core";
import ThumpUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./style.";
import { deletePost, likePost } from "../../../redux/actions/posts";

const Post = ({ setCurrentPost, post }) => {
	const user = useSelector(state => state.user.userInfo);
	const dispatch = useDispatch();
	const classes = useStyles();

	const isCorrectUser = () => {
		if (post.creator === user._id || post.creator === user.googleId)
			return true;
		return false;
	};

	const Like = () => {
		if (post.likes.length > 0) {
			return post.likes.find(like => like === user._id || user.googleId) ? (
				<>
					<ThumpUpAltIcon fontSize='small' />
					&nbsp;
					{post.likeCount > 2
						? `You and ${post.likeCount} others`
						: `${post.likeCount} like${post.likeCount === 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' /> &nbsp; {post.likeCount}{" "}
					{post.likeCount === 1 ? "like" : "likes"}
				</>
			);
		}

		return <ThumbUpAltOutlined fontSize='small' />;
	};

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={post.selectedFile}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'>{post.name}</Typography>
				<Typography variant='body2'>
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			{isCorrectUser() && (
				<div className={classes.overlay2}>
					<Button
						style={{ color: "white" }}
						size='small'
						onClick={() => setCurrentPost({ current: true, post: post })}
					>
						<MoreHorizIcon fontSize='small' />
					</Button>
				</div>
			)}
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary'>
					{post.tags[0].split(",").map(tag => `#${tag} `)}
				</Typography>
			</div>
			<Typography className={classes.title} variant='h5' gutterBottom>
				{post.title}
			</Typography>
			<CardContent>
				<Typography variant='body2' color='textSecondary'>
					{post.body}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user}
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<Like />
				</Button>
				{isCorrectUser() && (
					<Button
						size='small'
						color='primary'
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
