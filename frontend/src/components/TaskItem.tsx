import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import {ITask} from "../model/task";
import {useNavigate} from "react-router-dom";

type ITaskItem = {
	task: ITask;
	onDelete: (id: number) => void;
};
const TaskItem = ({task, onDelete}: ITaskItem) => {
	const navigate = useNavigate();
	return (
		<Card sx={{minWidth: 275, marginTop: "20px"}}>
			<CardContent>
				<Typography variant="h5" component="div">
					{task.title}
				</Typography>
				<Typography sx={{mb: 0}} color="text.secondary" variant="body2">
					{task.duedate?.toString()}
				</Typography>
				<Typography>{task.description}</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={() => {
						navigate(`/edit/${task.id}`);
					}}
				>
					Edit
				</Button>
				<Button
					size="small"
					color="error"
					onClick={() => {
                        if(task.id){
                            onDelete(task.id);
                        }
					}}
				>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default TaskItem;
