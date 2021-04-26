import {Navbar} from "react-bootstrap";
import logo from "../logo.svg";
import React from "react";

export default function Header()
{
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                Covid Tracker
            </Navbar.Brand>
            <Navbar.Brand>
                <img src={logo}
                     className="App-logo"
                     alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        </Navbar>
    );
}
