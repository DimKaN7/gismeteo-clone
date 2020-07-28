import React from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    const {weather, loading, selectedTab, onTabClick, onPrevClick, onNextClick} = props;
    // console.log(weather);

    return (
        <div className='weather-cont'>
            <WeatherTabs weather={weather}
                         loading={loading}
                         selectedTab={selectedTab}
                         onTabClick={onTabClick}>
            </WeatherTabs>
            <WeatherInfo weather={weather}
                         loading={loading}
                         selectedTab={selectedTab}
                         onPrevClick={onPrevClick}
                         onNextClick={onNextClick}>
            </WeatherInfo>
        </div>
    );
}