import React, {Component} from "react";
import {Form, Col, FormCheck} from "react-bootstrap";
import {GRAPH_MODE, InputRange} from "./GraphView";


interface ParamsViewProps
{
    range: InputRange;
    doublingRange: InputRange;
    mode: string;
    doShowRef: boolean;

    onModeChange(mode: string): void;

    onScaleChange(isLogPlot: boolean): void;

    onDaysChange(numberOfDays: number): void;

    onDoublingDaysChange(doublingDays: number): void;

    onShowRefChange(doShowRef: boolean): void;
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

    const modeForm = (
        <Form.Group id="form.ControlMode">
            <Form.Label>Select mode:</Form.Label>
            <Form.Control as="select"
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
                          onChange={handleScaleChange}>
                <option value='log'>Logarithmic</option>
                <option value='lin'>Linear</option>
            </Form.Control>
        </Form.Group>
    );

    const daysForm = (
        <Form.Group id="form.ControlDays">

            <Form.Label>
                {props.range.val > 1
                    ? `Data smoothed over ${props.range.val} days`
                    : 'No smoothing'}
            </Form.Label>
            <Form.Control type="range"
                          onChange={handleDaysChange}
                          min={props.range.min}
                          max={props.range.max}
                          step={1}
                          value={props.range.val}
            />
        </Form.Group>
    );
    const doublingDaysForm = (
        <Form.Group id="form.ControlDoublingDays">
            <Form.Row>
                <FormCheck
                    type='checkbox'
                    checked={props.doShowRef}
                    onChange={handleShowRefChange}/>
                <Form.Label>
                    Reference of {props.doublingRange.val} doubling
                    {props.doublingRange.val > 1 ? ' days' : ' day'}
                </Form.Label>
            </Form.Row>
            <Form.Control type="range"
                          onChange={handleDoublingDaysChange}
                          min={props.doublingRange.min}
                          max={props.doublingRange.max}
                          step={1}
                          value={props.doublingRange.val}
            />
        </Form.Group>
    );

    const showDoublingDays = [GRAPH_MODE.newVSTotalConfirmed]
        .includes(props.mode);
    return (
        <div className="params-view">
            <Form>
                <Form.Row>
                    <Col>{modeForm}</Col>
                    <Col>{scaleForm}</Col>
                    <Col>{daysForm}</Col>
                    <Col>{showDoublingDays && doublingDaysForm}</Col>
                </Form.Row>
            </Form>
        </div>
    );
    // }
}
