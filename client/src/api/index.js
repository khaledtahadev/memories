import axios from "axios";

const API = axios.create();

API.interceptors.request.use(req => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

// posts endpoint
export const fetchPosts = () => API.get("/posts");
export const createPost = post => API.post("/posts", post);
export const updatePost = post => API.patch(`/posts/${post._id}`, post);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);

// user endpoint
export const login = userInfo => API.post("/user/login", userInfo);
export const signup = userInfo => API.post("/user/signup", userInfo);
