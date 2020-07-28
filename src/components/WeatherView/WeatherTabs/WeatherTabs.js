import React from 'react';

import './WeatherTabs.css';

import {round, getWeatherIcon, getMaxFrequentIcon} from '../../../services/tools';
import WeahterTab from './WeatherTab/WeatherTab';

export default function WeatherTab(props) {
    const {weather, loading, selectedTab, onTabClick} = props;
    // console.log(weather);

    function getDayStat(day) { 
        const dayWeather = weather.slice(8 * day, (day + 1) * 8);
        // console.log(dayWeather);
        const minTemp = round(
                            dayWeather.map(w => w.main.temp_min)
                            .reduce((min, value) => Math.min(min, value))
                        , 0);
        const maxTemp = round(
                            dayWeather.map(
                                w => w.main.temp_max
                            ).reduce((max, value) => Math.max(max, value))
                        , 0);
        const precipitations = dayWeather.map(w => 
                 w.rain ? round(w.rain['3h'], 1) : 0
            ).reduce((sum, value) => round(sum + value, 1));
        const date = new Date(dayWeather[dayWeather.length - 1].dt * 1000);

        const icons = dayWeather.map(w => getWeatherIcon(w));
        const maxFrequentIcon = getMaxFrequentIcon(icons);

        return {
            minTemp: minTemp,
            maxTemp: maxTemp,
            precipitations: precipitations,
            date: date,
            maxFrequentIcon: maxFrequentIcon,
        };
    }

    const tabs = [0, 1, 2].map((el) => {
        const properties = {
            isFirst: el === 0 ? true : false,
            isSelected: loading ? false : (el === selectedTab ? true : false),
            title: el,
            stat: loading ? null : getDayStat(el),
            onTabClick: onTabClick,
        };
        return  <WeahterTab key={el}
                            properties={properties}
                            loading={loading}>
                </WeahterTab>
    });

    return (
        <div className='tabs-container'>
            {tabs}
        </div>
    );
}