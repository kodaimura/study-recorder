import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import SignupForm from '../parts/SignupForm';
import {apiDomain} from '../../utils/constants';


const SignupPage = () => {
	const [userName, setUserName] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfig] = useState("");
	const [error, setError] = useState("");

	const history = useHistory();
	

  	const signup = () => {
		if (password !== passwordConfirm) {
			setError("パスワードが一致していません。");
		}

		fetch(`${apiDomain}/signup`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				userName, 
				userId, 
				password, 
				passwordConfirm
			})
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 409) {
					setError(
						(response.status === 409)? 
						"IDが既に利用されています。" 
						: "登録に失敗しました。")
				}
				throw new Error(response.statusText);
			}
			document.location.href = "/"
		})
		.catch(console.error)
	}

	return (
		<>
		<Header 
			rightContent={
				<Button 
					variant="outlined" 
					onClick={() => history.push('/login')}
				>LOGIN</Button>}
		/>
		
		<SignupForm
			onChange1={(e) => setUserName(e.target.value)}
			onChange2={(e) => setUserId(e.target.value)}
			onChange3={(e) => setPassword(e.target.value)}
			onChange4={(e) => setPasswordConfig(e.target.value)}
			onClick={signup}
			errorMessage={error} />
		</>
		)
}

export default SignupPage;