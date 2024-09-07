import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { logout } from 'apis/users.api';

type Props = {
    username: string
}

const HeaderMenu: React.FC<Props> = ({ username }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <Dropdown onToggle={(isOpen) => setIsMenuOpen(isOpen)} className="d-flex">
            <Dropdown.Toggle
                as="button"
                variant="light"
                id="dropdown-custom-components"
                style={{ width: '36px', height: '36px', borderRadius: '50%' }}
            >
                <div className="d-flex align-items-center justify-content-center h-100 w-100">
                    {username.charAt(0)}
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
                show={isMenuOpen}
                className="shadow-sm"
                align="end"
                style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    minWidth: '200px',
                }}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <Dropdown.ItemText>{username}</Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item
                    as="button"
                    onClick={() => {
                        navigate("/password");
                        setIsMenuOpen(false);
                    }}
                >
                    <i className="bi bi-key me-2"></i>
                    パスワード変更
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                    as="button"
                    onClick={() => {
                        navigate("/");
                        setIsMenuOpen(false);
                    }}
                >
                    <i className="bi bi-house-door me-2"></i>
                    マイページ
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
					disabled
                >
                    <i className="bi bi-gear me-2"></i>
                    設定
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                    as="button"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    ログアウト
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export { HeaderMenu };
