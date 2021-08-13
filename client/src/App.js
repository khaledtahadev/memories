import { useEffect } from "react";
import { Container } from "@material-ui/core";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { AUTH, LOGOUT } from "./redux/types";

const App = () => {
	const dispatch = useDispatch();
	let location = useLocation();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("profile"));
		const token = user?.token;

		// calc token expire
		if (token) {
			const decodeToken = jwtDecode(token);
			if (!decodeToken.exp * 1000 < new Date().getTime()) {
				dispatch({ type: AUTH, payload: user });
			} else {
				dispatch({ type: LOGOUT });
			}
		}
	}, [location, dispatch]);

	return (
		<Container maxWidth='lg'>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/auth' component={Auth} />
				<Route path='*' render={() => <Redirect to='/' />} />
			</Switch>
		</Container>
	);
};

export default App;
