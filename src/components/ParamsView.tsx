import React from "react";
import {Form, Row, Col, FormCheck} from "react-bootstrap";
import {GRAPH_MODE, InputRange} from "./GraphView";


interface ParamsViewProps
{
    range: InputRange;
    doublingRange: InputRange;
    mode: string;
    doShowRef: boolean;
    doShowLegend: boolean;

    onModeChange(mode: string): void;

    onScaleChange(isLogPlot: boolean): void;

    onDaysChange(numberOfDays: number): void;

    onDoublingDaysChange(doublingDays: number): void;

    onShowRefChange(doShowRef: boolean): void;

    onShowLegendChange(doShowRef: boolean): void;
}

export function ParamsView(props: ParamsViewProps)
{

    const handleModeChange = (e: any) =>
    {
        const mode: string = e.target.value;
        props.onModeChange(mode);
    };

    const handleScaleChange = (e: any) =>
    {
        const scaleType: string = e.target.value;
        props.onScaleChange(scaleType === 'log');
    };

    const handleDaysChange = (e: any) =>
    {
        const val = Number(e.target.value);
        props.onDaysChange(val);
    };

    const handleDoublingDaysChange = (e: any) =>
    {
        const val = Number(e.target.value);
        props.onDoublingDaysChange(val);
    };

    const handleShowRefChange = (e: any) =>
    {
        const val = e.target.checked;
        props.onShowRefChange(val);
    }
    const handleShowLegendChange = (e: any) =>
    {
        const val = e.target.checked;
        props.onShowLegendChange(val);
    }

    const modeForm = (
        <Form.Group id="form.ControlMode">
            <Form.Label>Select mode:</Form.Label>
            <Form.Control as="select"
                          size="sm"
                          onChange={handleModeChange}>
                <option value={GRAPH_MODE.newVSTotalConfirmed}>
                    New/Total Cases
                </option>
                <option value={GRAPH_MODE.totalConfirmedVSTime}>
                    Total Cases(t)
                </option>
                <option value={GRAPH_MODE.totalRecoveredVSTime}>
                    Total Recoveries(t)
                </option>
                <option value={GRAPH_MODE.totalDeceasedVSTime}>
                    Total Deaths(t)
                </option>
                <option value={GRAPH_MODE.newConfirmedVSTime}>
                    New Cases(t)
                </option>
                <option value={GRAPH_MODE.newRecoveredVSTime}>
                    New Recoveries(t)
                </option>
                <option value={GRAPH_MODE.newDeceasedVSTime}>
                    New Deaths(t)
                </option>
            </Form.Control>
        </Form.Group>);

    const scaleForm = (
        <Form.Group id="form.ControlScale">
            <Form.Label>Select scale:</Form.Label>
            <Form.Control as="select"
                          size="sm"
                          onChange={handleScaleChange}>
                <option value='log'>Logarithmic</option>
                <option value='lin'>Linear</option>
            </Form.Control>
        </Form.Group>
    );

    const daysForm = (
        <div id="form.ControlDays">
            Smooth data over <span>
                <input className="input-small-number"
                       type="number"
                       onChange={handleDaysChange}
                       min={props.range.min}
                       max={props.range.max}
                       step={1}
                       value={props.range.val}
                       onKeyDown={(e) =>
                       {
                           e.preventDefault();
                           return false;
                       }}/>
            </span> {props.range.val > 1 ? 'days' : 'day'}
        </div>
    );

    const label = (
        <label htmlFor="double-check">
            Show {props.doublingRange.val} {props.doublingRange.val > 1 ?
            'days' : 'day'} doubling time
        </label>);
    const doublingDaysForm = (
        <div id="form.ControlDoublingDays">
            <FormCheck
                id="double-check"
                type='checkbox'
                label={label}
                checked={props.doShowRef}
                onChange={handleShowRefChange}
            />
            <Form.Control type="range"
                          onChange={handleDoublingDaysChange}
                          min={props.doublingRange.min}
                          max={props.doublingRange.max}
                          step={1}
                          value={props.doublingRange.val}
            />
        </div>
    );


    const showLegend = (<FormCheck
        id="legend"
        type='checkbox'
        label='Show legend'
        checked={props.doShowLegend}
        onChange={handleShowLegendChange}
    />);

    const showDoublingDays = [GRAPH_MODE.newVSTotalConfirmed]
        .includes(props.mode);

    return (
        <div className="params-view">
            <Form>
                <Row>
                    <Col>{modeForm}</Col>
                    <Col>{scaleForm}</Col>
                    <Col>
                        <Form.Row>{daysForm}</Form.Row>
                        <Form.Row>{showLegend}</Form.Row>
                    </Col>
                    {showDoublingDays &&
                    <Col>
                        {doublingDaysForm}
                    </Col>
                    }
                </Row>
            </Form>
        </div>
    );
    // }
}
