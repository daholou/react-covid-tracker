import axios from 'axios';

export const TS_CONFIRMED: string = "time_series_covid19_confirmed_global.csv";
export const TS_RECOVERED: string = "time_series_covid19_recovered_global.csv";
export const TS_DECEASED: string = "time_series_covid19_deaths_global.csv";

export default axios.create({
    baseURL: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/'
});

