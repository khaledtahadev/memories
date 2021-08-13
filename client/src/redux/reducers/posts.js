import {
	FETCH_POSTS,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
} from "../types";

const reducer = (state = [], { type, payload }) => {
	switch (type) {
		case FETCH_POSTS:
			return payload;

		case CREATE_POST:
			return [...state, payload];

		case UPDATE_POST:
		case LIKE_POST:
			return state.map(post => (post._id === payload._id ? payload : post));

		case DELETE_POST:
			return state.filter(post => post._id !== payload._id);

		default:
			return state;
	}
};

export default reducer;
