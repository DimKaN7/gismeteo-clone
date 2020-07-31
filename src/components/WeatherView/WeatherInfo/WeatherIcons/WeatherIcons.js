import React from 'react';

import './WeatherIcons.css';

import {chunkArray} from '../../../../services/tools';
import WeatherIcon from './WeatherIcon/WeatherIcon';

export default function WeatherIcons(props) {
    const {weatherIcons, selectedTab} = props;
    const hoursWeatherIcons = chunkArray(weatherIcons);

    const icons = hoursWeatherIcons.map((icons, index) => {
        return (
            <WeatherIcon key={index} 
                         selectedTab={selectedTab}
                         weatherIcons={icons}></WeatherIcon>
        );
    });

    return (
        <div className='icons-cont'>
            {icons}
        </div>
    );
}