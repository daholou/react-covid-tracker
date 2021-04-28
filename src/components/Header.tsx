import {Navbar, Nav} from "react-bootstrap";
import logo from "../logo.svg";
import React from "react";
import CustomPopover from "./CustomPopover";

export default function Header()
{
    const credits = (
        <div>
            <p>
                This project takes inspiration from the works of <a
                href="https://aatishb.com/"
                target="_blank"
                rel="noreferrer">Aatish
                Bhatia</a> and <a
                href="https://www.youtube.com/user/minutephysics"
                target="_blank"
                rel="noreferrer">Minute Physics</a>. Credit goes
                to them for the original idea.
                Check out their original project <a
                href="https://aatishb.com/covidtrends/"
                target="_blank"
                rel="noreferrer"> over here</a> !
            </p>
            <p>
                My objective was to recreate a similar app by using
                React instead of Vue, as a part of my training with
                React and TypeScript. The source for my version of
                the app can be found <a
                href="https://github.com/daholou/react-covid-tracker"
                target="_blank"
                rel="noreferrer">
                right here</a> !
            </p>
        </div>
    );

    const about = (
        <div>
            <p>
                The world data is provided by <a
                href={"https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series"}
                target="_blank"
                rel="noreferrer">Johns Hopkins University</a> (
                updates daily around 23:59 UTC).
            </p>
            <p>
                I would like to thank Johns Hopkins University for
                making this data publicly available, this kind of
                project would not be possible without it.
            </p>
        </div>
    );

    return (
        <Navbar bg="dark" variant="dark" className="header-app"
                expand="sm">
            <Navbar.Brand>COVID-19 Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link href="https://reactjs.org/"
                                  target="_blank"
                                  rel="noreferrer">
                            <img src={logo}
                                 className="App-logo"
                                 alt="logo"/>
                            Powered by ReactJS
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <CustomPopover buttonTitle='Credits & Source'
                                       popoverId='credits'
                                       popoverTitle='About this WebApp'
                                       popoverContent={credits}/>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <CustomPopover buttonTitle='COVID-19 World Data'
                                       popoverId='about'
                                       popoverTitle='Data Origin'
                                       popoverContent={about}/>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


