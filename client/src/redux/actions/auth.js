import { AUTH, AUTH_ERROR, CLEAR_ERROR } from "../types";
import * as api from "../../api";

export const logIn = (user, history) => async dispatch => {
	try {
		const { data } = await api.login(user);
		dispatch({ type: AUTH, payload: data });
		history.push("/");
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
	}
};

export const signUp = (user, history) => async dispatch => {
	try {
		const { data } = await api.signup(user);
		dispatch({ type: AUTH, payload: data });
		history.push("/");
	} catch (error) {
		dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
	}
};

export const clearError = () => {
	return { type: CLEAR_ERROR };
};
