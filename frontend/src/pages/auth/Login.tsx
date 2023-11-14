import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {login} from "../../services/auth.service";
import {toast} from "react-toastify";

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export default function Login() {
	const [state, setState] = React.useState({
		username: "",
		password: "",
	});

	const [error, setError] = React.useState({
		username: "",
		password: "",
	});

	const handleChange = (target: string, value: string) => {
		const newState: any = Object.assign({}, state);
		newState[target] = value;
		setState(newState);
		const newError: any = Object.assign({}, error);
		newError[target] = "";
		setError(newError);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (state.username && state.password) {
			login(state.username, state.password)
				.then((res: any) => {
					if (res) {
						toast.success("Logged in successfully!");
            window.location.reload();
					}
				})
				.catch((err) => {
					toast.error(err.response.data?.message);
				});
		} else {
			const newError: any = Object.assign({}, error);
			if (!state.username) newError.username = "required";
			if (!state.password) newError.password = "required";
			setError(newError);
		}
	};
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="User name"
							name="username"
							autoComplete="username"
							autoFocus
							value={state.username}
							onChange={(v) => handleChange("username", v.target.value)}
							error={error.username ? true : false}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={state.password}
							onChange={(v) => handleChange("password", v.target.value)}
							error={error.password ? true : false}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{mt: 3, mb: 2}}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
							
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{mt: 8, mb: 4}} />
			</Container>
		</ThemeProvider>
	);
}
