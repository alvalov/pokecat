import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

type NavBarProps = {
    showMenu: boolean,
    logOut: () => void
}

export const NavBar = (props: NavBarProps) =>{

    const barColor = {
        backgroundColor: "#242666"
    };

    const logoutButton = {
        backgroundColor: "#8BB6EF"
    }

    return (
        <Navbar expand="lg" variant="dark" className="py-3 static-top" style={barColor} >
            <Container>
                <Link className="nav-link navbar-brand" to="/">
                    <img src="https://i.imgur.com/jdZjbNK.png" alt="..." height="50"/>
                </Link>
                {props.showMenu && <> 
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="ms-auto">
                            <Nav.Item>
                                <Link className="nav-link" to="/info">INFO</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/battle">BATTLE</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/catch">CATCH</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/profile">PROFILE</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <button onClick={props.logOut} className="btn" style={logoutButton}>Log Out</button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </>}
            </Container>
        </Navbar>
    )
}