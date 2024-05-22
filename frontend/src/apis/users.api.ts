import {handleResponse, handleError, BASE_URL} from './api';


export const login = (
	username: string,
	password: string,
	setError?: (message: string) => void 
) => {
	fetch(`${BASE_URL}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({username, password})
	})
	.then(response => {
		if (!response.ok) {
			if (setError) {
				setError("Login failed.");
			}
			throw new Error(response.statusText);
		}
		return response.json();
	})
	.then(data => {
		localStorage.setItem("token", data.access_token);
		document.location.href = "/";
	})
	.catch(console.error);
}


export const logout = () => {
	localStorage.removeItem("token");
	document.location.href = "/";
}


export const signup = (
	username: string,
	password: string,
	passwordConfirm: string,
	setError?: (message: string) => void 
) => {
	if (password !== passwordConfirm && setError) {
		setError("Confirmation passwords do not match.");
		return;
	}

	fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			username, 
			password
		})
	})
	.then(response => {
		if (!response.ok) {
			if (setError) {
				setError((response.status === 409)? 
					"That Username is already in use." 
					: "Signup failed.");
			}
			throw new Error(response.statusText);
		}
		document.location.href = "/";
	}).catch(console.error);
}


export const changePassword = (
	password: string,
	newPassword: string,
	newPasswordConfirm: string,
	setError?: (message: string) => void 
) => {
	if (newPassword !== newPasswordConfirm && setError) {
		setError("Confirmation passwords do not match.");
		return
	}

	fetch(`${BASE_URL}/account/password`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
		},
		body: JSON.stringify({password, newPassword})
	})
	.then(response => {
		if (!response.ok) {
			if (setError) {
				setError("Failed.");
			}
			throw new Error(response.statusText);
		}
		document.location.href = "/logout";
	}).catch(console.error);
}


export const getProfile = async () => {
	return fetch(`${BASE_URL}/account/profile`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(handleResponse)
	.catch(handleError);
}


export const checkAuth = () => {
	return fetch(`${BASE_URL}/account/profile`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(response => {
		return (response.ok)? true : false;
	}).catch(() => {
		return false
	});
}