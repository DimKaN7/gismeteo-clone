import React, {useState} from 'react';

import './WeatherTabs.css';

import WeahterTab from './WeatherTab/WeatherTab';

export default function WeatherTab(props) {
    const {weather, selectedTab, onTabClick} = props;
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
        const precipitations = dayWeather.map(w => w.rain ? Math.round(w.rain['3h'] * 10)/10 : 0)
                               .reduce((sum, value) => sum + value);
        const date = new Date(dayWeather[dayWeather.length - 1].dt * 1000);

        return {
            minTemp: minTemp,
            maxTemp: maxTemp,
            precipitations: precipitations,
            date: date,
        };
    }

    const tabs = [0, 1, 2].map((el) => {
        const properties = {
            isFirst: el === 0 ? true : false,
            isSelected: el === selectedTab ? true : false,
            title: el,
            stat: getDayStat(el),
            onTabClick: onTabClick,
        };
        return  <WeahterTab key={el}
                            properties={properties}>
                </WeahterTab>
    });

    return (
        <div className='tabs-container'>
            {tabs}
        </div>
    );
}