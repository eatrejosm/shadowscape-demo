import Api from "./api";

const API_URL = process.env.REACT_APP_API_URL || "";

export const login = (username: string, password: string) => {
	return Api.post(`${API_URL}/auth/login`, {
		username,
		password,
	}).then((res: any) => {
    console.log(res)
		if (res.access_token) {
			localStorage.setItem("token", res.access_token);
		}
		return res;
	});
};

export const register = (username: string, password: string) => {
	return Api.post(`${API_URL}/auth/register`, {
		username,
		password,
	}).then((res: any) => {
		return res;
	});
};

export const logout = () => {
	localStorage.removeItem("token");
};
