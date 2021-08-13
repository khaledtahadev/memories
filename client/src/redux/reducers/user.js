import { AUTH, LOGOUT, AUTH_ERROR, CLEAR_ERROR } from "../types";

const reducer = (state = { userInfo: "", token: "" }, { type, payload }) => {
	switch (type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify(payload));
			return payload;

		case LOGOUT:
			localStorage.removeItem("profile");
			return { userInfo: "", token: "" };

		case AUTH_ERROR:
			return { error: payload };

		case CLEAR_ERROR:
			return {};
		default:
			return state;
	}
};

export default reducer;
