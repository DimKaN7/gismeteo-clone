import React from 'react';

import './WeatherInfo.css';

import Times from './Times/Times';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import TemperatureBoxes from './TempertureBoxes/TempertureBoxes';
import WindSpeed from './WindSpeed/WindSpeed';
import Precipitations from './Precipitations/Precipitations';

export default function WeatherInfo(props) {

    return (
        <div className='info-cont'>
            <Times></Times>
            <WeatherIcons></WeatherIcons>
            <TemperatureBoxes></TemperatureBoxes>
            <WindSpeed></WindSpeed>
            <Precipitations></Precipitations>
        </div>
    );
}