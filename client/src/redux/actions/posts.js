import {
	FETCH_POSTS,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
} from "../types";
import * as api from "../../api";

// actions creator
export const fetchPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: FETCH_POSTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: CREATE_POST, payload: data });
	} catch (error) {
		console.log({ error });
	}
};

export const updatePost = post => async dispatch => {
	try {
		const { data } = await api.updatePost(post);
		dispatch({ type: UPDATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = id => async dispatch => {
	try {
		const { data } = await api.deletePost(id);
		dispatch({ type: DELETE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = id => async dispatch => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};
