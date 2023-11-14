import Api from "./api";

const API_URL = process.env.REACT_APP_API_URL || "";

export const getTaskById = (id: number) => {
	return Api.get(`${API_URL}/task/id?id=:id`, {}, {id: id});
};

export const getTasks = () => {
	return Api.get(`${API_URL}/task`);
};

export const createTask = (
	title: string,
	description: string,
	duedate: Date
) => {
	return Api.post(`${API_URL}/task`, {
		title,
		description,
		duedate,
	});
};

export const updateTask = (
	id: number,
	title: string,
	description: string,
	duedate: Date
) => {
	return Api.put(`${API_URL}/task`, {
		id,
		title,
		description,
		duedate,
	});
};

export const deleteTask = (id: number) => {
	return Api.delete(`${API_URL}/task?id=:id`, {}, {id: id});
};
