import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../apis/users.api';

type Props = {
    username: string
}

const HeaderMenu: React.FC<Props> = (props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleClose = () => {
		setIsMenuOpen(false);
	};

	return (
		<div className="d-flex align-items-center text-center position-relative">
			<button
				type="button"
				className="btn btn-light rounded-circle"
				onClick={handleClick}
				style={{ width: '36px', height: '36px' }}
			>
				<div className="d-flex align-items-center justify-content-center h-100 w-100">
					{props.username.charAt(0)}
				</div>
			</button>

			{isMenuOpen && (
				<div
					className="dropdown-menu dropdown-menu-end mt-2 shadow-sm show"
					style={{ position: 'absolute', top: '100%', right: 0 }}
					onMouseLeave={handleClose}
				>
					<div className="dropdown-item-text">{props.username}</div>
					<div className="dropdown-divider"></div>
					<button
						className="dropdown-item d-flex align-items-center"
						onClick={() => {
							navigate("/password");
							handleClose();
						}}
					>
						<span className="me-2">
							<i className="bi bi-key"></i>
						</span>
						パスワード変更
					</button>
					<div className="dropdown-divider"></div>
					<button
						className="dropdown-item d-flex align-items-center"
						onClick={() => {
							navigate("/");
							handleClose();
						}}
					>
						<span className="me-2">
							<i className="bi bi-house-door"></i>
						</span>
						マイページ
					</button>
					<button
						className="dropdown-item d-flex align-items-center"
						onClick={() => {
							navigate("/settings");
							handleClose();
						}}
					>
						<span className="me-2">
							<i className="bi bi-gear"></i>
						</span>
						設定
					</button>
					<div className="dropdown-divider"></div>
					<button className="dropdown-item d-flex align-items-center" onClick={() => {
						logout();
						handleClose();
					}}>
						<span className="me-2">
							<i className="bi bi-box-arrow-right"></i>
						</span>
						ログアウト
					</button>
				</div>
			)}
		</div>
	);
};

export default HeaderMenu;