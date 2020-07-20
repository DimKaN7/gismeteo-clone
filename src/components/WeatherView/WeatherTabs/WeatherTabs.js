import React, {useState} from 'react';

import './WeatherTabs.css';

import WeahterTab from './WeatherTab/WeatherTab';

export default function WeatherTab(props) {
    const {weather} = props;
    // console.log(weather);

    function getDayStat(day) { 
        let dayWeather = weather.slice(8 * day, (day + 1) * 8);
        const minTemp = Math.round(
                        dayWeather.map(w => w.main.temp_min)
                        .reduce((min, value) => Math.min(min, value))
                        );
        const maxTemp = Math.round(
                        dayWeather.map(w => w.main.temp_max)
                        .reduce((max, value) => Math.max(max, value))
                        );
        const precipitations = dayWeather.map(w => w.rain ? w.rain['3h'] : 0)
                               .reduce((sum, value) => sum + value);
        const date = new Date(dayWeather[dayWeather.length - 1].dt * 1000);
        // const dayOfWeek = date.getUTCDay();
        // const dayNum = date.getUTCDate();
        // const month = date.getUTCMonth();

        return {
            minTemp: minTemp,
            maxTemp: maxTemp,
            precipitations: precipitations,
            date: date,
        };
    }

    return (
        <div className='tabs-container'>
            <WeahterTab isFirst={true} title={0}
                        stat={getDayStat(0)}></WeahterTab>
            <WeahterTab title={1} stat={getDayStat(1)}></WeahterTab>
            <WeahterTab title={2} stat={getDayStat(2)}></WeahterTab>
        </div>
    );
}