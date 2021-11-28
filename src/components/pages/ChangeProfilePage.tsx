import {useState} from 'react';

import Header from '../parts/Header';
import SignupForm from '../parts/SignupForm';
import HeaderMenu from '../organisms/HeaderMenu';
import {apiDomain} from '../../utils/constants';


const ChangeProfilePage = () => {
	const [userName, setUserName] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfig] = useState("");
	const [error, setError] = useState("");


  	const changeProfile = () => {
		if (password !== passwordConfirm) {
			setError("パスワードが一致していません。");
		}

		fetch(`${apiDomain}/changeprofile`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`},
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
			localStorage.removeItem("token");
			document.location.href = "/"
		})
		.catch(console.error)
	}

	return (
		<>
		<Header rightContent={<HeaderMenu />}/>

		<SignupForm
			onChange1={(e) => setUserName(e.target.value)}
			onChange2={(e) => setUserId(e.target.value)}
			onChange3={(e) => setPassword(e.target.value)}
			onChange4={(e) => setPasswordConfig(e.target.value)}
			onClick={changeProfile}
			buttonText="CHANGE"
			errorMessage={error} />
		</>
		)
}

export default ChangeProfilePage;