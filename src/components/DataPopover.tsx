import {Button, Overlay, Popover} from "react-bootstrap";
import React from "react";

export default function DataPopover() // <=== And we have our winner !
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
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}

// {
//     const [show, setShow] = useState(false);
//     const target = useRef(null);
//
//     return (
//         <>
//             <Button variant="primary"
//                     className={"navbar-button"}
//                     ref={target}
//                     onClick={() => setShow(!show)}>
//                 A word about this data
//             </Button>
//             <Overlay target={target.current}
//                      show={show}
//                      placement="bottom"
//                      transition={false}
//                      container={undefined}
//                      containerPadding={20}
//                      onEnter={undefined}
//                      onEntered={undefined}
//                      onEntering={undefined}
//                      onExit={undefined}
//                      onExited={undefined}
//                      onExiting={undefined}
//                      onHide={() =>{setShow(false)}}
//                      popperConfig={undefined}
//                      rootClose={true}
//                      rootCloseEvent={undefined}>
//                 {({placement, arrowProps, show: _show, popper, ...props}) => (
//                     <div {...props}
//                          style={{
//                              backgroundColor: 'rgba(123,123,123,0.85)',
//                              padding: '2px 10px',
//                              color: 'whitesmoke',
//                              borderRadius: 10,
//                              border: 'solid black 1px',
//                              // marginTop: '10px',
//                              maxWidth: '50%',
//                              ...props.style,
//                          }}>
//                         <h3>About</h3>
//                         <p>
//                             The world data is provided by <a
//                             href={"https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series"}
//                             target="_blank"
//                             rel="noreferrer">
//                             Johns Hopkins University</a> (updates daily around 23:59
//                             UTC).
//                         </p>
//                         <p>
//                             I would like to thank Johns Hopkins University for making
//                             this data publicly available, this kind of project would
//                             not be possible without it.
//                         </p>
//                     </div>
//                 )}
//             </Overlay>
//         </>
//     );
// }

// const DataPopover = () =>
// {
//     const popover = (
//         <Popover id="popover-data">
//             <Popover.Title as="h3">About</Popover.Title>
//             <Popover.Content>
//                 <p>
//                     The world data is provided by <a
//                     href={"https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series"}
//                     target="_blank"
//                     rel="noreferrer">
//                     Johns Hopkins University</a> (updates daily around 23:59
//                     UTC).
//                 </p>
//                 <p>
//                     I would like to thank Johns Hopkins University for making
//                     this data publicly available, this kind of project would
//                     not be possible without it.
//                 </p>
//             </Popover.Content>
//         </Popover>
//     );
//     return (
//         <OverlayTrigger trigger="click"
//                         placement="bottom"
//             // transition={false}
//             // rootClose={true} // deprecated in strict mode !
//                         overlay={popover}>
//             <Button variant="primary" className="navbar-button">
//                 Source
//             </Button>
//         </OverlayTrigger>);
// }
