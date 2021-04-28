import Plot from "react-plotly.js";
import React, {Component} from "react";
import {DatedTimeSeries, Entry, TimeSeries} from "../models/timeSeries";
import {AxisType, Data} from "plotly.js";
import {ParamsView} from "./ParamsView";
import {Alert, Row} from "react-bootstrap";

// const clamp = (x: number, min: number, max: number) =>
//     Math.max(min, Math.min(x, max));

export const GRAPH_MODE = Object.freeze({
    totalConfirmedVSTime: "total cases vs t",
    totalRecoveredVSTime: "total recoveries vs t",
    totalDeceasedVSTime: "total deaths vs t",
    newConfirmedVSTime: "new cases vs t",
    newRecoveredVSTime: "new recoveries vs t",
    newDeceasedVSTime: "new deaths vs t",
    newVSTotalConfirmed: "daily vs current cases",
});

export interface InputRange
{
    min: number;
    val: number;
    max: number;
}

function format(d: Date): string
{
    // YYYY-MM-DD
    return d.toISOString().slice(0, 10);
}

function formatHuman(d: Date): string
{
    const tmp = d.toISOString();
    return `${tmp.slice(8, 10)}/${tmp.slice(5, 7)}/${tmp.slice(0, 4)}`;
}

interface GraphViewProps
{
    dts: DatedTimeSeries;
}

interface GraphViewState
{
    // graph mode
    mode: string;
    // number of days used for computing smooth averages
    numberOfDays: number;
    doublingDays: number;
    // true for log plots (otherwise linear scale)
    isLogPlot: boolean;
    doShowRef: boolean;
    doShowLegend: boolean;
}

interface MinMax
{
    min: number;
    max: number;
}

function getMinMax(values: number[]): MinMax
{
    const reducerMinMax = (acc: MinMax, val: number) =>
    {
        acc.min = Math.min(acc.min, val);
        acc.max = Math.max(acc.max, val);
        return acc;
    }
    const init: MinMax = {min: Number.MAX_VALUE, max: Number.MIN_VALUE};
    return values.reduce(reducerMinMax, init);
}


// The graph component displays a plot depending on the currently activated
// countries. It also depends on the view mode (enum GRAPH_MODE) and other
// parameters to determine what type of plot is drawn
export class GraphView
    extends Component<GraphViewProps, GraphViewState>
{
    constructor(props: GraphViewProps)
    {
        super(props);
        this.state = {
            mode: GRAPH_MODE.newVSTotalConfirmed,
            numberOfDays: 15,
            doublingDays: 14,
            isLogPlot: true,
            doShowRef: true,
            doShowLegend: true,
        }
    }


    timeValue(e: Entry): number
    {
        switch (this.state.mode)
        {
            case GRAPH_MODE.totalConfirmedVSTime :
                return e.numberOfCases;
            case GRAPH_MODE.totalRecoveredVSTime :
                return e.numberOfRecoveries;
            case GRAPH_MODE.totalDeceasedVSTime :
                return e.numberOfDeaths;
            default:
                return 0;
        }
    }

    template(): string
    {
        const {mode} = this.state;
        const date = mode === GRAPH_MODE.newVSTotalConfirmed ? '%{text}<br>' : '';
        return ('<i><b>%{fullData.name}</b></i><br>' +
            date +
            '%{xaxis.title.text}: %{x}<br>' +
            '%{yaxis.title.text}: %{y}<br>' +
            '<extra></extra>');
    }

    getData(): Data[]
    {
        const activeTS = this.props.dts.data.filter(ts => ts.active);
        const dates: string[] = this.props.dts.time.map(d => format(d));
        if (activeTS.length === 0)
        {
            return [];
        }

        const res: Data[] = [];
        let xMin: number = Number.MAX_VALUE;
        let xMax: number = Number.MIN_VALUE;
        const {doShowRef, mode, doShowLegend} = this.state;
        for (const ts of activeTS)
        {
            const xDataVal = this.xData(ts);
            const minMax = getMinMax(xDataVal
                .map((d: number | string) => Number(d)));
            xMin = Math.min(xMin, minMax.min);
            xMax = Math.max(xMax, minMax.max);
            const trace: Data = {
                type: "scatter",
                mode: "lines",
                name: ts.name,
                x: xDataVal,
                y: this.yData(ts),
                text: dates,
                hovertemplate: this.template(),
                showlegend: doShowLegend,
                line: {color: ts.hexColor}
            };

            res.push(trace);
        }


        if (doShowRef && mode === GRAPH_MODE.newVSTotalConfirmed)
        {
            const {doublingDays} = this.state;
            // const nbPoints = dates.length - 1;
            // const delta = (xMax - xMin) / nbPoints;
            // const xRef = dates.map(
            //     (date, index) => xMin + delta * index);
            const xRef = [xMin, xMax];
            const yRef = xRef.map(x => x / doublingDays);

            const refTrace: Data = {
                type: "scatter",
                mode: "lines",
                name: 'ref',
                x: xRef,
                y: yRef,
                line: {
                    color: '#9335a8',
                    dash: "dashdot",
                },
                hoverinfo: "skip",
                showlegend: false
            };
            res.push(refTrace);
        }
        return res;
    }

    // Extract the abscissa of a time series data points
    xData(ts: TimeSeries): number[] | string[]
    {
        const {mode} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalConfirmedVSTime :
            case GRAPH_MODE.totalRecoveredVSTime :
            case GRAPH_MODE.totalDeceasedVSTime :
            case GRAPH_MODE.newConfirmedVSTime :
            case GRAPH_MODE.newRecoveredVSTime :
            case GRAPH_MODE.newDeceasedVSTime :
                return this.props.dts.time.map(d => format(d));
            case GRAPH_MODE.newVSTotalConfirmed :
                return ts.entries.map(e => e.numberOfCases);
            default:
                throw new Error(`Unknown mode ${mode}`);
        }
    }

    smooth(values: number[], count: number): number[]
    {
        const result = new Array<number>(values.length);
        for (let t = 0; t < values.length; t++)
        {
            const from = Math.max(0, t + 1 - count);
            let avg = 0;
            for (let j = from; j <= t; j++)
            {
                avg += values[j];
            }
            result[t] = avg / (t - from + 1);
        }
        return result;
    }

    // Extract the ordinate of a time series data points
    yData(ts: TimeSeries): number[]
    {
        const {mode, numberOfDays} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalConfirmedVSTime :
                return ts.entries.map(e => e.numberOfCases);
            case GRAPH_MODE.totalRecoveredVSTime :
                return ts.entries.map(e => e.numberOfRecoveries);
            case GRAPH_MODE.totalDeceasedVSTime :
                return ts.entries.map(e => e.numberOfDeaths);
            case GRAPH_MODE.newConfirmedVSTime :
            case GRAPH_MODE.newVSTotalConfirmed :
                const tmpC = ts.entries.map(e => e.numberOfNewCases);
                return this.smooth(tmpC, numberOfDays);
            case GRAPH_MODE.newRecoveredVSTime :
                const tmpR = ts.entries.map(e => e.numberOfNewRecoveries);
                return this.smooth(tmpR, numberOfDays);
            case GRAPH_MODE.newDeceasedVSTime :
                const tmpD = ts.entries.map(e => e.numberOfNewDeaths);
                return this.smooth(tmpD, numberOfDays);
            default:
                throw new Error(`Unknown mode ${mode}`);
        }
    }

    onModeChange = (newMode: string) =>
    {
        this.setState({mode: newMode});
    };
    onScaleChange = (newIsLogPlot: boolean) =>
    {
        this.setState({isLogPlot: newIsLogPlot});
    };
    onDaysChange = (newNumberOfDays: number) =>
    {
        this.setState({
            numberOfDays: newNumberOfDays
        });
    };
    onDoublingDaysChange = (newDoublingDays: number) =>
    {
        this.setState({
            doublingDays: newDoublingDays
        });
    };
    onShowRefChange = (newShowRef: boolean) =>
    {
        this.setState({
            doShowRef: newShowRef
        });
    };
    onShowLegendChange = (newShowLegend: boolean) =>
    {
        this.setState({
            doShowLegend: newShowLegend
        });
    };

    private get xAxisTitle(): string
    {
        const {mode} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalRecoveredVSTime:
            case GRAPH_MODE.totalConfirmedVSTime:
            case GRAPH_MODE.totalDeceasedVSTime:
            case GRAPH_MODE.newConfirmedVSTime:
                return 'Date';
            case GRAPH_MODE.newVSTotalConfirmed:
                return 'Total Confirmed Cases';
            default:
                return '';
        }
    }

    private get xTickFormat(): string
    {
        const {mode} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalRecoveredVSTime:
            case GRAPH_MODE.totalConfirmedVSTime:
            case GRAPH_MODE.totalDeceasedVSTime:
            case GRAPH_MODE.newConfirmedVSTime:
                return "%d %b %Y";
            case GRAPH_MODE.newVSTotalConfirmed:
                return ",.0f";
            default:
                return "";
        }
    }

    private get xAxisType(): AxisType
    {
        const {mode, isLogPlot} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalRecoveredVSTime:
            case GRAPH_MODE.totalConfirmedVSTime:
            case GRAPH_MODE.totalDeceasedVSTime:
            case GRAPH_MODE.newConfirmedVSTime:
            case GRAPH_MODE.newRecoveredVSTime:
            case GRAPH_MODE.newDeceasedVSTime:
                return 'date';
            case GRAPH_MODE.newVSTotalConfirmed:
                return isLogPlot ? 'log' : 'linear';
            default:
                return '-';
        }
    }

    private get yAxisType(): AxisType
    {
        const {mode, isLogPlot} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalRecoveredVSTime:
            case GRAPH_MODE.totalConfirmedVSTime:
            case GRAPH_MODE.totalDeceasedVSTime:
            case GRAPH_MODE.newConfirmedVSTime:
            case GRAPH_MODE.newRecoveredVSTime:
            case GRAPH_MODE.newDeceasedVSTime:
            case GRAPH_MODE.newVSTotalConfirmed:
                return isLogPlot ? 'log' : 'linear';
            default:
                return '-';
        }
    }

    private get yAxisTitle(): string
    {
        const {mode, numberOfDays} = this.state;
        switch (mode)
        {
            case GRAPH_MODE.totalRecoveredVSTime:
                return 'Total Recoveries';
            case GRAPH_MODE.totalConfirmedVSTime:
                return 'Total Confirmed Cases';
            case GRAPH_MODE.totalDeceasedVSTime:
                return 'Total Reported Deaths';
            case GRAPH_MODE.newConfirmedVSTime:
            case GRAPH_MODE.newVSTotalConfirmed:
                const note = numberOfDays > 1 ?
                    `(${numberOfDays} days avg.)` : '';
                return `Daily Cases ${note}`
            default:
                return '';
        }
    }

    render(): JSX.Element
    {
        const {mode} = this.state;
        // this.props.dts.data
        //     .filter(d=>d.name==="France")
        //     .forEach(ts=>{console.log("France: ", ts.hexColor)});
        const dates = this.props.dts.time;
        let title = 'No data provided';
        if (dates.length >= 1)
        {
            const start = formatHuman(dates[0]);
            const end = formatHuman(dates[dates.length - 1]);
            title = `Trajectory of World COVID-19 (${mode}) from ${start} to ${end}`;
        }

        const layout = {
            title: {
                text: title,
                font: {
                    size: 18,
                }
            },
            xaxis: {
                title: {
                    text: this.xAxisTitle,
                    font: {
                        size: 14,
                        color: '#3649b1'
                    }
                },
                type: this.xAxisType,
                hoverformat: this.xTickFormat,
            },
            yaxis: {
                title: {
                    text: this.yAxisTitle,
                    font: {
                        size: 14,
                        color: '#3649b1'
                    }
                },
                type: this.yAxisType,
                hoverformat: ",.0f",
            },
            autosize: true,
            legend: {
                x: 0,
                y: 1,
                font: {
                    family: 'sans-serif',
                    size: 12,
                    color: '#000'
                },
                bgcolor: '#E2E2E2',
                bordercolor: '#FFFFFF',
                borderwidth: 2
            }
        }

        const config = {responsive: true}
        const data: Data[] = this.getData();
        const plot = data.length > 0
            ? (<Plot className={'graph'}
                     data={data}
                     layout={layout}
                     config={config}
                     useResizeHandler={true}/>)
            : (<Alert variant="warning">
                    <Alert.Heading>Oops, there is no data to display !</Alert.Heading>
                    <hr/>
                    <p>
                        Please select at least one country in the right panel
                        to display a plot.
                    </p>
                    <p className="mb-0">
                        If that doesn't work, try hitting your F5 key to
                        refresh the page.
                    </p>
                    <p className="mb-0">
                        If that doesn't work, maybe the data
                        cannot be retrieved, or maybe you've encountered a bug.
                    </p>
                </Alert>
            );

        const {numberOfDays, doublingDays} = this.state;
        const range: InputRange = {min: 1, val: numberOfDays, max: 30};
        const doublingRange: InputRange = {min: 1, val: doublingDays, max: 100};
        return (
            <div>
                <Row className="body-graph">
                    <div className="graph-view">
                        {plot}
                    </div>
                </Row>
                <Row className="footer-graph">
                    <ParamsView range={range}
                                doublingRange={doublingRange}
                                mode={mode}
                                doShowRef={this.state.doShowRef}
                                doShowLegend={this.state.doShowLegend}
                                onModeChange={this.onModeChange}
                                onScaleChange={this.onScaleChange}
                                onDaysChange={this.onDaysChange}
                                onShowRefChange={this.onShowRefChange}
                                onShowLegendChange={this.onShowLegendChange}
                                onDoublingDaysChange={this.onDoublingDaysChange}
                    />
                </Row>
            </div>
        );
    }
}
