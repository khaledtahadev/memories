import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
	type,
	name,
	label,
	value,
	autoFocus,
	half,
	onChange,
	handleShowPassword,
}) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				type={type}
				name={name}
				value={value}
				label={label}
				onChange={onChange}
				variant='outlined'
				autoFocus={autoFocus}
				required
				fullWidth
				InputProps={
					name === "password"
						? {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassword}>
											{type === "password" ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
						  }
						: null
				}
			/>
		</Grid>
	);
};

export default Input;
