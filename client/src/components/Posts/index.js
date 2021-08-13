import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post";
import useStyles from "./style";

const Posts = ({ setCurrentPost }) => {
	const posts = useSelector(state => state.posts);
	const classes = useStyles();

	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			container
			className={classes.container}
			alignItems='stretch'
			spacing={3}
		>
			{posts.map(post => (
				<Grid item xs={12} sm={6} key={post._id}>
					<Post post={post} setCurrentPost={setCurrentPost} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
