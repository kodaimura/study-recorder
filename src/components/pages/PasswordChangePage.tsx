import Header from '../parts/Header';
import PasswordChangeForm from '../parts/PasswordChangeForm';
import HeaderMenu from '../organisms/HeaderMenu';


const PasswordChangePage = () => {

	return (
		<>
		<Header rightContent={<HeaderMenu />}/>

		<PasswordChangeForm />
		</>
		)
}

export default PasswordChangePage;