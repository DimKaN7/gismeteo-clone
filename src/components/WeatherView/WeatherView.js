import React, {useState} from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    const {weather, selectedTab, onTabClick} = props;
    // console.log(weather);

    return (
        <div className='weather-cont'>
            <WeatherTabs weather={weather}
                         selectedTab={selectedTab}
                         onTabClick={onTabClick}>
            </WeatherTabs>
            <WeatherInfo weather={weather}
                         selectedTab={selectedTab}>
            </WeatherInfo>
        </div>
    );
}