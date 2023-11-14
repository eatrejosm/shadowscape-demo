// import { onApplicationError } from "actions/application.action";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import isString from "lodash/isString";

import {toast} from "react-toastify";

class Api {
	static get(route: string, data: any = {}, params: any = {}) {
		return this.xhr(route, data, params, "get");
	}

	static put(route: string, data: any = {}, params: any = {}) {
		return this.xhr(route, data, params, "put");
	}

	static post(route: string, data: any = {}, params: any = {}) {
		return this.xhr(route, data, params, "post");
	}

	static delete(route: string, data: any = {}, params: any = {}) {
		return this.xhr(route, data, params, "delete");
	}

	static replaceVariables(route: string, params: any) {
		Object.keys(params).forEach((key) => {
			route = route.replace(`:${key}`, params[key]);
		});
		return route;
	}

	static wrapApiErrors(error: any = {}) {
		try {
			const {status, data} = error.response || {};
			if (!status) {
				throw new Error("Connection with API server is broken");
			}
			if (status === 500) {
				const {message} = data;
                const token = localStorage.getItem('token')
                if(token){
                    localStorage.removeItem('token')
                    if (!message) {
                        throw new Error(data);
                    }
                }
                
			}
			const {message} = data;
			if (!message) {
				throw new Error(data);
			}

			if (isString(message)) {
				throw new Error(message);
			}
			if (status === 400) {
				if (Array.isArray(message)) throw new Error(message[0]);
				const {problems = []} = message;
				const mes = problems.reduce(
					(str: string, problem: string) => `${str}\n${problem}`,
					""
				);
				throw new Error(mes);
			}
			throw new Error("Unknown error");
		} catch (e: any) {
			console.log("API error", e);
			const error = (e && e.message) || null;
			toast(error, {type: "error"});
			// throw e;
		}
	}

	static xhr(route: string, data = {}, params = {}, method: string) {
		const token = localStorage.getItem('token');

		const sendRequest = (axiosInstance: AxiosInstance) => {
			const url = Api.replaceVariables(route, params);
			const headers: any = {
				"Content-Type": "application/json",
			};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}
			const options: any = {
				url,
				method,
				headers,
				timeout: 15000,
			};

			if (method === "get") {
				options.params = data;
			} else {
				options.data = data;
			}

			return axiosInstance(options)
				.then((res) => res.data)
				.catch((err) => {
					return Api.wrapApiErrors(err);
				});
		};
		return sendRequest(axios.create());
	}

}

export default Api;
