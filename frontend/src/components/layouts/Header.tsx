import React, { ReactNode } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

type Props = {
    rightContent: ReactNode
}

const Header: React.FC<Props> = ({ rightContent }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="/calendar">
                        STUDY RECORDER
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        {rightContent}
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ width: '100%', height: '70px' }}></div>
        </>
    );
}

export default Header;
