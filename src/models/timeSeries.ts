import {getColor} from "../apis/color-conversions-algorithms";

export interface Entry
{
    numberOfCases: number;
    numberOfDeaths: number;
    numberOfRecoveries: number;
    numberOfNewCases: number;
    numberOfNewDeaths: number;
    numberOfNewRecoveries: number;
}

export function makeEntry(): Entry
{
    return {
        numberOfCases: 0,
        numberOfDeaths: 0,
        numberOfRecoveries: 0,
        numberOfNewCases: 0,
        numberOfNewDeaths: 0,
        numberOfNewRecoveries: 0,
    };
}

export interface TimeSeries
{
    name: string;
    entries: Entry[];
    active: boolean;
    hexColor: string;
}

export function makeTimeSeries(): TimeSeries
{
    return {
        name: '',
        entries: [],
        active: false,
        hexColor: '#246284'
    };
}

export interface DatedTimeSeries
{
    time: Date[];
    data: TimeSeries[];
}


function equal3(a: number, b: number, c: number): boolean
{
    return (a === b && b === c);
}

// 2 list of increasing indices, both of same size
interface DatesIndices
{
    length: number,
    indicesA: number[],
    indicesB: number[],
}

function commonRange(a: Date[], b: Date[]): DatesIndices
{
    const res: DatesIndices = {length: 0, indicesA: [], indicesB: []};

    // reading heads on list a, and list b
    let idxA: number = 0;
    let idxB: number = 0;
    while (idxA < a.length && idxB < b.length)
    {
        // compare both dates
        const valueA = a[idxA].valueOf();
        const valueB = b[idxB].valueOf();
        if (valueA === valueB)
        {
            res.indicesA.push(idxA++);
            res.indicesB.push(idxB++);
            res.length++;
        }
        else if (valueA < valueB)
        {
            idxA++;
        }
        else // valueA > valueB
        {
            idxB++;
        }
    }
    return res;
}

function sumEntry(a: Entry, b: Entry): Entry
{
    return {
        numberOfCases: a.numberOfCases + b.numberOfCases,
        numberOfRecoveries: a.numberOfRecoveries + b.numberOfRecoveries,
        numberOfDeaths: a.numberOfDeaths + b.numberOfDeaths,
        numberOfNewCases: a.numberOfNewCases + b.numberOfNewCases,
        numberOfNewRecoveries: a.numberOfNewRecoveries + b.numberOfNewRecoveries,
        numberOfNewDeaths: a.numberOfNewDeaths + b.numberOfNewDeaths,
    };
}


// Sum two dated time series with similar date spans and identical rows.
// assumption: a and b have the same rows (same number of rows, and each row
// of a is a time series with has the same name as the corresponding row of b).
function sumDTS(dtsA: DatedTimeSeries, dtsB: DatedTimeSeries): DatedTimeSeries
{
    const dtsC: DatedTimeSeries = {time: [], data: []};
    for (let k = 0; k < dtsA.data.length; k++)
    {
        const ts = makeTimeSeries();
        ts.name = dtsA.data[k].name;
        dtsC.data.push(ts);
    }

    const common = commonRange(dtsA.time, dtsB.time);
    for (let idx = 0; idx < common.length; idx++)
    {
        const idxA = common.indicesA[idx];
        const idxB = common.indicesB[idx];
        dtsC.time.push(dtsA.time[idxA]);

        // For each time series we are building,
        // combine data from idxA in a, and from idxB in b
        for (let k = 0; k < dtsA.data.length; k++)
        {
            const entA: Entry = dtsA.data[k].entries[idxA];
            const entB: Entry = dtsB.data[k].entries[idxB];
            const entC: Entry = sumEntry(entA, entB);
            dtsC.data[k].entries.push(entC);
        }
    }

    return dtsC;
}


interface Dict
{
    [key: string]: number;
}

// const JHU_BIG = ['Canada', 'Australia', 'China'];
// const JHU_DEP = ['Netherlands', 'United Kingdom', 'France', 'Denmark'];

export const CONFIRMED = 1;
export const RECOVERED = 2;
export const DECEASED = 3;
// Transform a blob of data (parsed csv file from JHU) into a suitable dated
// time series, by grouping all regions of the 'big' countries, and also by
// grouping all dependencies of the 'dep' countries with their mainland.
function rework(data: unknown[], ref: number): DatedTimeSeries
{
    // safeguard: there should be at least 1 line
    if (data.length < 1)
    {
        throw new Error('No header!');
    }
    // each extracted time series will be stored in this array
    const result: TimeSeries[] = [];

    /* data table should look like so (each entry of data is a row array)
     * 'Province/State' | 'Country/Region' | lat | lon | 1/1/20 | 2/1/20 ...
     * Queensland       | Australia        | -27 | 153 | 94     | 144    ...
     * ...
     * ...
     */

    // Read the first row, infer the size and list of dates
    const header = data[0] as string[];
    // safeguard: we expect at least the first 4 columns
    const size = header.length - 4;
    if (size < 0)
    {
        throw new Error('Less than 4 columns in header!');
    }

    // dates are formatted 'MM/DD/YY' so new Date() should suffice
    const dates: Date[] = new Array<Date>(size);
    for (let idx = 0; idx < size; idx++)
    {
        dates[idx] = new Date(header[idx + 4]);
    }

    let dict: Dict = {};

    // Now we attack the rows. We want to create one time series per country
    // under our header. Note that the same country can appear on multiple
    // rows, in which case we simply sum up the values on those rows.
    for (let idx = 1; idx < data.length; idx++)
    {
        const row: string[] = data[idx] as string[];
        if (row.length === header.length)
        {
            // each entry is a number (of people)
            const data = new Array<number>(size);
            for (let k = 0; k < size; k++)
            {
                data[k] = Number(row[4 + k]);
            }

            const countryName = row[1].trim();
            let ts: TimeSeries = makeTimeSeries();

            // The country exist: add data to the existing time series
            if (countryName in dict)
            {
                ts = result[dict[countryName]];
            }
            // The country doesnt exist: use data to create new time series
            else
            {
                dict[countryName] = result.length;
                ts.name = countryName;
                for (let k = 0; k < size; k++)
                {
                    ts.entries.push(makeEntry());
                }
                // build a new time series from the row
                result.push(ts);
            }

            // add data to either the existing or newly created time series
            for (let k = 0; k < size; k++)
            {
                switch (ref)
                {
                    case CONFIRMED:
                        ts.entries[k].numberOfCases += data[k];
                        break;
                    case RECOVERED:
                        ts.entries[k].numberOfRecoveries += data[k];
                        break;
                    case DECEASED:
                        ts.entries[k].numberOfDeaths += data[k];
                        break;
                }
            }
        }
        else
        {
            console.error(
                `Ignored row ${idx} / ${data.length - 1}. It has ` +
                `${row.length} columns, but header has ${header.length}`)
        }
    }


    // sort resulting countries by name
    result.sort((a, b) =>
        a.name.localeCompare(b.name));

    return {time: dates, data: result};
}


export function getTSFromJHU_Data(dataConfirmed: unknown[],
                                  dataRecovered: unknown[],
                                  dataDeceased: unknown[])
    : DatedTimeSeries
{
    const dtsCon = rework(dataConfirmed, CONFIRMED);
    const dtsRec = rework(dataRecovered, RECOVERED);
    const dtsDec = rework(dataDeceased, DECEASED);

    console.log('C', dtsCon.data.length, dtsCon.time.length)
    console.log('R', dtsRec.data.length, dtsRec.time.length)
    console.log('D', dtsDec.data.length, dtsDec.time.length)

    // safeguard: tables should have the same number of rows
    if (!equal3(dtsCon.data.length, dtsRec.data.length, dtsDec.data.length))
    {
        throw new Error(`Entries count mismatch! ` +
            `Confirmed ${dtsCon.data.length}, ` +
            `Recovered ${dtsRec.data.length}, ` +
            `Deceased ${dtsDec.data.length}`)
    }

    const dtsCR = sumDTS(dtsCon, dtsRec);
    const dtsCRD = sumDTS(dtsCR, dtsDec);

    // Compute a color for each time series
    for (let it = 0; it < dtsCon.data.length; it++)
    {
        dtsCRD.data[it].hexColor = getColor(it);
    }

    // Compute number of new cases, recoveries, deaths (over 1 day) for each ts
    for (let it = 0; it < dtsCon.data.length; it++)
    {
        const entries = dtsCRD.data[it].entries;
        const summed = entries.map(
            e => e.numberOfCases + e.numberOfRecoveries + e.numberOfDeaths);
        entries[0].numberOfNewCases = entries[0].numberOfCases;
        entries[0].numberOfNewRecoveries = entries[0].numberOfRecoveries;
        entries[0].numberOfNewDeaths = entries[0].numberOfDeaths;
        for (let u = 1; u < entries.length; u++)
        {
            const deltaC = summed[u] - summed[u - 1];
            const deltaR =
                entries[u].numberOfRecoveries -
                entries[u - 1].numberOfRecoveries;
            const deltaD =
                entries[u].numberOfDeaths -
                entries[u - 1].numberOfDeaths;
            entries[u].numberOfNewCases = deltaC;
            entries[u].numberOfNewRecoveries = deltaR;
            entries[u].numberOfNewDeaths = deltaD;
        }
    }
    return dtsCRD;
}

// {
//     // safeguard: tables should have the same number of lines
//     if (!equal3(dataConfirmed.length, dataRecovered.length,
//         dataDeceased.length))
//     {
//         throw new Error(`Entries count mismatch! ` +
//             `Confirmed ${dataConfirmed.length}, ` +
//             `Recovered ${dataRecovered.length}, ` +
//             `Deceased ${dataDeceased.length}`)
//     }
//     // safeguard: there should be at least 1 line per table
//     if (dataConfirmed.length < 1)
//     {
//         throw new Error('No header!')
//     }
//
//
//     // each extracted time series will be stored in this array
//     const result: TimeSeries[] = []
//
//     /* data table should look like so (each entry of data is a row array)
//      * 'Province/State' | 'Country/Region' | lat | lon | 1/1/20 | 2/1/20 ...
//      * Queensland       | Australia        | -27 | 153 | 94     | 144    ...
//      * ...
//      * ...
//      */
//
//     // Read the first row, infer the size and list of dates
//     const header = dataConfirmed[0] as string[];
//
//     // safeguard: tables should have the same number of columns
//     const head2 = dataRecovered[0] as string[];
//     const head3 = dataDeceased[0] as string[];
//     if (!equal3(header.length, head2.length,
//         head3.length))
//     {
//         throw new Error(`Column count mismatch! ` +
//             `Confirmed ${header.length}, ` +
//             `Recovered ${head2.length}, ` +
//             `Deceased ${head3.length}`)
//     }
//
//     // safeguard: we expect at least the first 4 columns to exist
//     const numberOfDates = header.length - 4;
//     if (numberOfDates < 0)
//     {
//         throw new Error('Less than 4 columns in header!')
//     }
//
//     // dates are formatted 'MM/DD/YY' so new Date() should suffice
//     const dates: Date[] = new Array<Date>(numberOfDates);
//     for (let idx = 0; idx < numberOfDates; idx++)
//     {
//         dates[idx] = new Date(header[idx + 4]);
//     }
//
//     // Create one time series per row under our header
//     const numberOfEntries = dataConfirmed.length; // == rec.length == death.length
//     for (let idx = 1; idx < numberOfEntries; idx++)
//     {
//         const rowC: string[] = dataConfirmed[idx] as string[];
//         const rowR: string[] = dataRecovered[idx] as string[];
//         const rowD: string[] = dataDeceased[idx] as string[];
//
//         if (rowC.length === header.length)
//         {
//             // build a new time series from the row
//             const ts = makeTimeSeries();
//             // Province, Country are string. Lat, Lon are numbers
//             ts.provinceOrState = rowC[0].trim();
//             ts.countryOrRegion = rowC[1].trim();
//             ts.latitude = Number(rowC[2]);
//             ts.longitude = Number(rowC[3]);
//
//             // each entry is a number (of people)
//             ts.entries = new Array<Entry>(numberOfDates);
//             for (let k = 0; k < numberOfDates; k++)
//             {
//                 const shiftedK = k + 4;
//                 ts.entries[k] = {
//                     numberOfCases: Number(rowC[shiftedK]),
//                     numberOfRecoveries: Number(rowR[shiftedK]),
//                     numberOfDeaths: Number(rowD[shiftedK]),
//                 }
//             }
//             // unique id
//             ts.id = idx;
//             ts.name = ts.provinceOrState ?
//                 `${ts.provinceOrState} (${ts.countryOrRegion})` :
//                 `${ts.countryOrRegion}`;
//
//             // append the new time series
//             result.push(ts);
//         }
//         else
//         {
//             console.error(`Ignored row ${idx} / ${numberOfEntries - 1}. ` +
//                 `It has ${rowC.length} columns, header has ${header.length}`);
//         }
//     }
//
//     // all done
//     return {time: dates, data: result};
// }


// {
//     for (let k = 4; k < row.length; k++)
//     {
//         ts.entries.push(+row[k]);
//     }
//     result.push(ts);
// }
// // add 3 'total' entries for Australia, Canada, China
// const spec: Country[] = [
//     {name: "Australia", latitude: 25.2744, longitude: 133.7751},
//     {name: "Canada", latitude: 56.1304, longitude: 106.3468},
//     {name: "China", latitude: 35.8617, longitude: 104.1954}
// ];
// const added = spec.map(country => group(country, data));
// added.forEach(ts => result.push(ts));
// result.sort((a, b) =>
//     (a.provinceOrState + a.countryOrRegion)
//         .localeCompare(b.provinceOrState + b.countryOrRegion));


// interface Country
// {
//     name: string;
//     latitude: number;
//     longitude: number;
// }
//
// function group(country: Country, data: TimeSeries[]): TimeSeries
// {
//     const total = makeTimeSeries();
//     total.provinceOrState = country.name;
//     total.latitude = country.latitude;
//     total.longitude = country.longitude;
//
//     const filtered = data.filter(ts => ts.provinceOrState === country.name);
//     console.log(country.name, filtered.length, filtered);
//     if (filtered.length > 0)
//     {
//         for (let j = 0; j < filtered[0].entries.length; j++)
//         {
//             let nb = 0;
//             for (let i = 0; i < filtered.length; i++)
//             {
//                 nb += filtered[i].entries[j];
//             }
//             total.entries.push(nb);
//         }
//     }
//     return total;
// }
