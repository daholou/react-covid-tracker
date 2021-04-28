import '../App.css';
import {TimeSeries} from "../models/timeSeries";
import {FormCheck, ListGroup} from "react-bootstrap";

interface CheckboxTSProps
{
    series: TimeSeries;
    onClick: (series: TimeSeries) => void;
}

// Dumb component that displays a checkable time series to toggle it to
// active or inactive.
// - The component aspect changes depending on whether the time series is
// active or not.
// - On click, the parent is notified that it needs to switch the active
// status of the clicked time series. The parent will then call setState,
// which will re-render this component
export function CheckboxTS(props: CheckboxTSProps): JSX.Element
{
    const handleChange = () =>
    {
        props.onClick(props.series);
    }

    return (
        <ListGroup.Item onClick={handleChange}
                        action
                        variant={props.series.active ? 'success' : ""}
                        className="unselectable-text">
            <MiniCheckbox isChecked={props.series.active}
                          name={props.series.name}/>
        </ListGroup.Item>
    );

    // constructor()
    // {
    //     super(props);
    //     this.state = {
    //         isChecked: props.series.active
    //     };
    // }

    // handleChange = () =>
    // {
    //     const {isChecked} = this.state;
    //     const newIsChecked = !isChecked;
    //     this.props.onClick(this.props.series, newIsChecked);
    //     this.setState(
    //         {isChecked: newIsChecked}
    //     );
    // }
    //
    // render(): JSX.Element
    // {
    //     const {isChecked} = this.state;
    //     return (
    //         <ListGroup.Item onClick={this.handleChange}
    //                         action
    //                         variant={isChecked ? 'success' : ""}
    //                         className="unselectable-text">
    //             {this.props.series.name}
    //         </ListGroup.Item>
    //     );
    // }
}

interface MiniCheckboxProps
{
    name: string;
    isChecked: boolean;
}

function MiniCheckbox(props: MiniCheckboxProps): JSX.Element
{
    return <FormCheck
        type='checkbox'
        label={props.name}
        checked={props.isChecked}
        onChange={() =>
        {
        }}
    />;
}
