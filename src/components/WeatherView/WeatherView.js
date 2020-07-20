import React, {useState} from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    const {weather} = props;
    // console.log(weather);

    return (
        <div className='weather-cont'>
            <WeatherTabs weather={weather}></WeatherTabs>
            <WeatherInfo></WeatherInfo>
        </div>
    );
}