import { Routes, Route, Navigate } from "react-router-dom";
import Logout from "../pages/auth/Logout";
import TaskList from "../pages/tasks/TaskList";
import Task from "../pages/tasks/Task";

export function MainRoutes() {
    return (
        <Routes>
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/create" element={<Task />} />
            <Route path="/edit/:id" element={<Task />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<Navigate replace to="/tasks" />} />
        </Routes>
    )
}
