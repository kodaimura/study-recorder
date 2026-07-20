import React, { ReactNode } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

type Props = {
    rightContent: ReactNode
}

const Header: React.FC<Props> = ({ rightContent }) => {
    return (
        <header>
            <Navbar className="app-header" variant="dark" fixed="top" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="/calendar" className="app-brand">
                        STUDY RECORDER
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        {rightContent}
                    </Nav>
                </Container>
            </Navbar>
            <div className="header-spacer"></div>
        </header>
    );
}

export { Header };
