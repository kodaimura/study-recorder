import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode, 
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button 
            className={`btn ${props.className}`} 
            onClick={props.onClick} 
            disabled={props.disabled}
        >
        {props.children}
        </button>
    );
};

export default Button;