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
import {createTask, getTaskById, getTasks, updateTask} from "../../services/task.service";
import {Button, FormControl, OutlinedInput, TextField} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { toast } from "react-toastify";

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

export default function Task() {
	const [task, setTask] = useState<ITask>({title: "", description: "", duedate: new Date("2022-01-01")});
    const [editMode, setEditMode] = useState(false)
	const navigate = useNavigate();

    const {id} = useParams();
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname!=='/create' && id){
            setEditMode(true)
            getTaskById(parseInt(id)).then(res=>{
                setTask(res)
            })
        }
    }, [location])

	const handleChange = (v: any, key: string) => {
		setTask({
			...task,
			[`${key}`]: v,
		});
	};

    const handleSave = ()=>{
        if(task.title.length===0)return;
        if(editMode){
            updateTask(task.id!, task.title, task.description, task.duedate).then(()=>{
                toast.success('Updated Successfully')    
            })
        }else {
            createTask(task.title, task.description , task.duedate).then(()=>{
                toast.success('Created Successfully')
            })
        }
        
    }


	useEffect(() => {}, []);

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
						Create Task
					</Typography>
					<Button
						onClick={() => {
							navigate("/");
						}}
					>
						Go to back
					</Button>
					<Box
						component={"div"}
						sx={{
							py: 3,
						}}
					>
						<TextField
							label="Title"
							value={task.title}
							onChange={(e) => {
								handleChange(e.target.value, "title");
							}}
							fullWidth
                            required
                            error={task.title.length===0}
						/>
						<TextField
							label="Description"
							value={task.description}
							onChange={(e) => {
								handleChange(e.target.value, "description");
							}}
							multiline
							fullWidth
							sx={{my: 3}}
                            rows={4}    
						/>
						<TextField
							label=""
							value={task.duedate}
							onChange={(e) => {
								handleChange(e.target.value, "duedate");
							}}
							type="date"
						/>
						<Button
							variant="outlined"
							sx={{display: "block", marginTop: "20px"}}
                            onClick={handleSave}
						>
							Save
						</Button>
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
