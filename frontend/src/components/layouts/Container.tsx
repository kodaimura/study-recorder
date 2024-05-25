import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const Header: React.FC<Props> = (props) => {
    return (
        <div className='container'>{props.children}</div>
    );
}

export default Header;