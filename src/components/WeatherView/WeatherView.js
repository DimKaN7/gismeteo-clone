import React, {useState} from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    return (
        <div className='weather-cont'>
            <h1>Weather in Irkutsk</h1>
            <WeatherTabs></WeatherTabs>
            <WeatherInfo></WeatherInfo>
        </div>
    );
}