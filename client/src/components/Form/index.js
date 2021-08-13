import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./style.js";
import { createPost, updatePost } from "../../redux/actions/posts";

const Form = ({ currentPost, setCurrentPost }) => {
	const user = useSelector(state => state.user.userInfo);
	const [postData, setPostData] = useState({
		name: "",
		title: "",
		body: "",
		tags: "",
		selectedFile: "",
	});
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		if (currentPost) setPostData(currentPost.post);
	}, [currentPost]);

	const handleSubmit = e => {
		e.preventDefault();

		if (currentPost.current) {
			dispatch(updatePost(postData));
		} else {
			dispatch(createPost({ ...postData, name: user.name }));
		}
		clear();
	};

	const clear = () => {
		setCurrentPost(false);
		setPostData({
			title: "",
			body: "",
			tags: "",
			selectedFile: "",
		});
	};

	if (!user) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form
				className={`${classes.root} ${classes.form}`}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentPost ? "Editing Memory" : "Creating Memory"}
				</Typography>

				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={e => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name='body'
					variant='outlined'
					label='Description'
					fullWidth
					multiline
					rows={4}
					value={postData.body}
					onChange={e => setPostData({ ...postData, body: e.target.value })}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={e => setPostData({ ...postData, tags: e.target.value })}
				/>

				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>

				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
