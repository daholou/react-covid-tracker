import React, {Component} from "react";
import {DatedTimeSeries, TimeSeries} from "../models/timeSeries";
import {CheckboxTS} from "./CheckboxTS";
import {ListGroup} from "react-bootstrap";
import {SearchBar} from "./SearchBox";

interface CountryFilterProps
{
    series: DatedTimeSeries;
    onToggleActiveTS: (series: TimeSeries) => void;
}

interface CountryFilterState
{
    mKeyword: string;
}

// This component lets us select which countries to display by means of a
// filtering system. It can access the data in its props.
// - When parent component (CovidTracker) fetches all data at application
//   start, it will cause the prop 'series' to automatically update.
export class CountryFilter
    extends Component<CountryFilterProps, CountryFilterState>
{
    constructor(props: CountryFilterProps)
    {
        super(props);
        this.state = {mKeyword: ""}
    }

    onClick = (ts: TimeSeries) =>
    {
        console.log('control panel onClick')
        this.props.onToggleActiveTS(ts);
    }

    onKeywordChange = (keyword: string) =>
    {
        console.log('Country Filter', keyword);
        this.setState({mKeyword: keyword});
    }

    render(): JSX.Element
    {
        const data = this.props.series.data;
        const {mKeyword} = this.state;

        const sortedData = data.slice();
        sortedData.sort((a, b) =>
        {
            if (a.active === b.active) // a, b have same status
            {
                return a.name.localeCompare(b.name);
            }
            else
            {
                // a active => b is inactive, thus a is greater
                // a inactive => b active thus b is greater
                return a.active ? -1 : 1;
            }
        });

        return (
            <div>
                <div className='country-filter-header'>
                    <h3>Countries</h3>
                    <SearchBar keyword={mKeyword}
                               setKeyword={this.onKeywordChange}/>
                </div>
                <ListGroup className='scrollable-panel-lg'>
                    {sortedData.map(ts => (
                        (ts.active ||
                            ts.name.toLowerCase()
                                .startsWith(mKeyword.toLowerCase()))
                        && <CheckboxTS key={ts.name}
                                       series={ts}
                                       onClick={this.onClick}/>
                    ))}
                </ListGroup>
            </div>
        );
    }
}
