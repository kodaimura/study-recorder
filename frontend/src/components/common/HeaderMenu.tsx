import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { logout } from 'apis/users.api';

type Props = {
    username: string
}

const HeaderMenu: React.FC<Props> = ({ username }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate("/login");
    };

    const handleNavigation = (path: string) => {
        if (location.pathname === path) {
            // 同じページの場合はリロードを強制
            window.location.reload();
        } else {
            navigate(path);
        }
        setIsMenuOpen(false);
    };

    return (
        <Dropdown
            show={isMenuOpen}
            onToggle={(isOpen) => setIsMenuOpen(isOpen)}
            align="end"
            className="d-flex"
        >
            <Dropdown.Toggle
                as="button"
                id="header-user-menu"
                className="user-menu-button"
            >
                {username.charAt(0)}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="shadow-sm app-dropdown"
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <Dropdown.ItemText>{username}</Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item
                    as="button"
                    onClick={() => handleNavigation("/")}
                >
                    <i className="bi bi-house-door me-2"></i>
                    ホーム
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    onClick={() => handleNavigation("/password")}
                >
                    <i className="bi bi-key me-2"></i>
                    パスワード変更
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    onClick={() => handleNavigation("/settings")}
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
