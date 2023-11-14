import React, {useState} from "react";
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
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import {register} from "../../services/auth.service";

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

export default function Register() {
	const navigate = useNavigate();
	const [state, setState] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState({
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

		if (
			state.username &&
			state.password &&
			state.password.length >= 8
		) {
			register(state.username, state.password).then((res: any) => {
				toast.success("Registered successfully!");
				navigate("/login");
			});
		} else {
			const newError: any = Object.assign({}, error);
			if (!state.username) newError.username = "required";
			if (!state.password || state.password.length < 8)
				newError.password = "required";
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
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="given-name"
									name="username"
									required
									fullWidth
									id="username"
									label="User Name"
									autoFocus
									value={state.username}
									onChange={(v) => handleChange("username", v.target.value)}
									error={error.username ? true : false}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={state.password}
									onChange={(v) => handleChange("password", v.target.value)}
									error={error.password ? true : false}
									helperText={
										error.password ? "Password length should be over 8." : ""
									}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{mt: 3, mb: 2}}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{mt: 5}} />
			</Container>
		</ThemeProvider>
	);
}
