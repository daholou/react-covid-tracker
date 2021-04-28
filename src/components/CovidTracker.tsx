import React, {Component} from 'react';
import {CountryFilter} from "./CountryFilter";
import API, {TS_CONFIRMED, TS_DECEASED, TS_RECOVERED} from "../apis/api";
import {readString} from "react-papaparse"
import {
    DatedTimeSeries,
    getTSFromJHU_Data, TimeSeries,
} from "../models/timeSeries";
import {Container, Row, Col} from "react-bootstrap";
import {GraphView} from "./GraphView";

const PRESET = ['france', 'spain', 'italy', 'united kingdom', 'india'];

interface CovidTrackerProps
{
}

interface CovidTrackerState
{
    // All covid-19 data fetched from John Hopkins University
    dts: DatedTimeSeries;
}


// This is the application main smart component. It encapsulates all of the
// internal logic for our covid tracker. Its child components can thus be
// stateless and simply be used to display information.
// - Data (in the form of time series) is fetched once, on initialization,
//   and is not altered after that.
// - Some time series can be activated or deactivated by child components
// - Display parameters can be modified by child components
export class CovidTracker
    extends Component<CovidTrackerProps, CovidTrackerState>
{
    constructor(props: CovidTrackerProps)
    {
        super(props);
        this.state = {
            dts: {time: [], data: []}
        };
    }

    // Toggles the active status of a time series
    // Note: arrow fn is used here to correctly bind 'this' when passing
    // this function as a child component props
    onToggleActiveTS = (ts: TimeSeries) =>
    {
        // toggle active status
        ts.active = !ts.active;
        // re-render
        this.setState({});
    };

    onSelectAll = (select: boolean) =>
    {
        const {dts} = this.state;
        dts.data.forEach( ts => ts.active = select);
        this.setState({});
    }

    // Loads time series once, on initialisation
    private loadTimeSeries(url: string): Promise<unknown[]>
    {
        return API.get<string>(url)
            .then(response => response.data)
            .then(csvString => readString(csvString))
            .then(parseResult => parseResult.data);
    }

    // On initialisation, download all time series
    componentDidMount(): void
    {
        // For each time series, we need to download the data and then
        // compile it into a TimeSeries with one Entry per timestamp
        Promise.all([
            this.loadTimeSeries(TS_CONFIRMED),
            this.loadTimeSeries(TS_RECOVERED),
            this.loadTimeSeries(TS_DECEASED)]).then(
            (values) =>
            {
                const dts = getTSFromJHU_Data(
                    values[0], values[1], values[2]);
                dts.data.forEach(
                    ts => ts.active = PRESET.includes(ts.name.toLowerCase()));
                this.setState({
                    dts: dts,
                });
            });
    }

    render(): JSX.Element
    {
        return (
            <Container fluid className='container-app'>
                <Row>
                    <Col className='col-graph-view'>
                        <GraphView dts={this.state.dts}/>
                    </Col>
                    <Col sm={2} className='col-country'>
                        <CountryFilter
                            series={this.state.dts}
                            onToggleActiveTS={this.onToggleActiveTS}
                            onSelectAll={this.onSelectAll}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}
