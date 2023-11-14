import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TaskItem from "../../components/TaskItem";
import {ITask} from "../../model/task";
import {useEffect, useState} from "react";
import {deleteTask, getTasks} from "../../services/task.service";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Logout from "../auth/Logout";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const defaultTheme = createTheme();

export default function TaskList() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const navigate = useNavigate();

	const fetchTask = () => {
		getTasks().then((res) => {
			setTasks(res);
		});
	};
	useEffect(() => {
		fetchTask();
	}, []);

	const onDelete = (id: number) => {
		deleteTask(id).then(() => {
			fetchTask();
		});
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<CssBaseline />
				<Container component="main" sx={{mt: 8, mb: 2}} maxWidth="sm">
					<Typography variant="h2" component="h1">
						Task Management
					</Typography>
					<Button
						onClick={() => {
							navigate("/create");
						}}
					>
						Create new task
					</Button>
					<Button
						onClick={() => {
							navigate('/logout')
						}}
                        color="secondary"
					>
						Log out
					</Button>
					<Box>
						{tasks.map((task, index) => (
							<TaskItem task={task} key={index} onDelete={onDelete} />
						))}
					</Box>
				</Container>
				<Box
					component="footer"
					sx={{
						py: 3,
						px: 2,
						mt: "auto",
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[200]
								: theme.palette.grey[800],
					}}
				>
					<Container maxWidth="sm">
						<Copyright />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
