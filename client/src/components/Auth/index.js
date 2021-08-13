import { useState } from "react";
import {
	Container,
	Paper,
	Avatar,
	Typography,
	Grid,
	Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../../redux/types";
import { useHistory } from "react-router-dom";
import { clearError, logIn, signUp } from "../../redux/actions/auth.js";

import Input from "./Input";
import useStyles from "./style";
import GoogleIcon from "./googleIcon";

const initialFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const AuthForm = () => {
	const [isSignup, setIsSignup] = useState(false);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const { error } = useSelector(state => state.user);
	const history = useHistory();

	const classes = useStyles();

	const handleChange = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signUp(formValues, history));
		} else {
			dispatch(logIn(formValues, history));
		}
	};

	const handlePassword = () => {
		setShowPassword(prevState => !prevState);
	};

	const switchForm = () => {
		setFormValues(initialFormValues);
		setIsSignup(prevState => !prevState);
		setShowPassword(false);
	};

	// google handle
	const googleSuccess = res => {
		const userInfo = res.profileObj;
		const token = res.tokenId;

		try {
			dispatch({ type: AUTH, payload: { userInfo, token } });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFail = err => {
		console.log(err);
	};

	return (
		<Container maxWidth='xs'>
			{error && (
				<Alert
					variant='filled'
					severity='error'
					onClose={() => dispatch(clearError())}
				>
					{error}
				</Alert>
			)}
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignup ? "Sign up" : "Sign in"}
				</Typography>

				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									autoFocus
									half
									value={formValues.firstName}
									onChange={handleChange}
								/>
								<Input
									name='lastName'
									label='last Name'
									half
									value={formValues.lastName}
									onChange={handleChange}
								/>
							</>
						)}
						<Input
							type='email'
							name='email'
							label='Email Address'
							value={formValues.email}
							onChange={handleChange}
						/>
						<Input
							type={showPassword ? "text" : "password"}
							name='password'
							label='Password'
							value={formValues.password}
							onChange={handleChange}
							handleShowPassword={handlePassword}
						/>
						{isSignup && (
							<Input
								type='password'
								name='confirmPassword'
								label='Repeat Password'
								value={formValues.confirmPassword}
								onChange={handleChange}
								handleShowPassword={handlePassword}
							/>
						)}

						{/* submit button */}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							{isSignup ? "Sign Up" : "Sign In"}
						</Button>

						{/* google login */}
						<GoogleLogin
							clientId='440536491946-p26rpi8llus5p063hp5eumjvngbtoe9d.apps.googleusercontent.com'
							render={renderProps => (
								<Button
									className={classes.googleButton}
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									variant='contained'
									color='primary'
									fullWidth
									startIcon={<GoogleIcon />}
								>
									Google Sign in
								</Button>
							)}
							onSuccess={googleSuccess}
							onFailure={googleFail}
							cookiePolicy='single_host_origin'
						/>

						{/*  switch form */}
						<Button
							onClick={switchForm}
							fullWidth
							className={classes.centerText}
						>
							{isSignup
								? "Already have an account? Sign in"
								: "Don't have account? Sign Up"}
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default AuthForm;
