import { useState, useEffect } from "react";
import { Grid, Container, Grow } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { fetchPosts } from "../../redux/actions/posts";
import Posts from "../Posts";
import Form from "../Form";

const Home = () => {
	const [currentPost, setCurrentPost] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentPost={setCurrentPost} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentPost={currentPost} setCurrentPost={setCurrentPost} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
