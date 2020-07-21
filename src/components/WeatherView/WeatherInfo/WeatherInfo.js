import React from 'react';

import './WeatherInfo.css';

import Times from './Times/Times';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import TemperatureBoxes from './TempertureBoxes/TempertureBoxes';
import WindSpeed from './WindSpeed/WindSpeed';
import Precipitations from './Precipitations/Precipitations';

export default function WeatherInfo(props) {
    const {weather, selectedTab} = props;
    const dayWeather = weather.slice(8 * selectedTab, 8 * (selectedTab + 1));
    const temps = dayWeather.map(w => Math.round(w.main.temp));
    const speeds = dayWeather.map(w => Math.round(w.wind.speed));
    const precipitations = dayWeather.map(w => w.rain ? Math.round(w.rain['3h'] * 10)/10 : 0);

    return (
        <div className='info-cont'>
            <Times></Times>
            <WeatherIcons></WeatherIcons>
            <TemperatureBoxes temps={temps}></TemperatureBoxes>
            <WindSpeed speeds={speeds}></WindSpeed>
            <Precipitations precipitations={precipitations}></Precipitations>
        </div>
    );
}