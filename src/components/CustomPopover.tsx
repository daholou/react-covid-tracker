import React from "react";
import {Button, Overlay, Popover} from "react-bootstrap";

interface CustomPopoverProps
{
    buttonTitle: string;
    popoverId: string;
    popoverTitle: string;
    popoverContent: JSX.Element;
}

export default function CustomPopover(props: CustomPopoverProps)
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
                {props.buttonTitle}
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
                popperConfig={undefined}
                rootCloseEvent={undefined}>
                <Popover id={`custom-popover-${props.popoverId}`}>
                    <Popover.Title as="h3">
                        {props.popoverTitle}
                    </Popover.Title>
                    <Popover.Content>
                        {props.popoverContent}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}
