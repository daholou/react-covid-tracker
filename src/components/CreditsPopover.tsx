import {Button, Overlay, Popover} from "react-bootstrap";
import React from "react";


export default function CreditsPopover()
{
    const [show, setShow] = React.useState(false);
    const [target, setTarget] = React.useState(null);
    const ref = React.useRef(null);
    const handleClick = (event: any) =>
    {
        setShow(!show);
        setTarget(event.target);
    };
    return (
        <div ref={ref}>
            <Button onClick={handleClick}
                    variant="primary"
                    className="navbar-button"
            >
                About this App
            </Button>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={20}
                onEnter={undefined}
                onEntered={undefined}
                onEntering={undefined}
                onExit={undefined}
                onExited={undefined}
                onExiting={undefined}
                onHide={() =>
                {
                    setShow(false)
                }}
                transition={false}
                rootClose={true}
                popperConfig={undefined} rootCloseEvent={undefined}>
                <Popover id="popover-about">
                    <Popover.Title as="h3">Credits & Source</Popover.Title>
                    <Popover.Content>
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
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}

