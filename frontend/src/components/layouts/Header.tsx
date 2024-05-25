import React, { ReactNode } from 'react';

type Props = {
    rightContent: ReactNode
}

const Header: React.FC<Props> = (props) => {
    return (
        <>
        <header>
            <nav className='navbar fixed-top navbar-expand-sm bg-black'>
                <div className='container-fluid'>
                    <a className='navbar-brand px-3 text-light fw-bolder' href='/calendar'>
                    STUDY RECORDER
                    </a>
                    <div className='d-flex justify-content-end'>
                    {props.rightContent}
                    </div>
                </div>
            </nav>
        </header>
        <div style={{width:'100%', height:'70px'}}></div>
        </>
    );
}

export default Header;