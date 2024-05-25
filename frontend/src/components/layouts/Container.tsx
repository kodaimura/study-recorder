import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
}

const Container: React.FC<Props> = (props) => {
    return (
        <div className={`container ${props.className}`} >{props.children}</div>
    );
}

export default Container;