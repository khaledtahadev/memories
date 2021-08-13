import { Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/types";
// image
import memories from "../../images/memories.png";

import useStyles from "./style";

const Navbar = () => {
	const user = useSelector(state => state.user.userInfo);
	const dispatch = useDispatch();

	const classes = useStyles();

	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<Typography
					className={classes.heading}
					variant='h2'
					align='center'
					component={Link}
					to='/'
				>
					Memories
				</Typography>
				<img
					className={classes.image}
					src={memories}
					alt='memories'
					height='60'
				/>
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.name}
							src={user?.imageUrl}
						>
							{user.name.charAt(0).toUpperCase()}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						variant='contained'
						color='primary'
						component={Link}
						to='/auth'
					>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
