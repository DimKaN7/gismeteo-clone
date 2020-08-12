import React from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    const {weather, lang, loading, selectedTab, onTabClick, onPrevClick, onNextClick} = props;

    return (
        <div className='weather-cont'>
            <div className='tabs-wrapper'>
                <WeatherTabs weather={weather}
                             loading={loading}
                             lang={lang}
                             selectedTab={selectedTab}
                             onTabClick={onTabClick}>
                </WeatherTabs>
            </div>
            <WeatherInfo weather={weather}
                         loading={loading}
                         lang={lang}
                         selectedTab={selectedTab}
                         onPrevClick={onPrevClick}
                         onNextClick={onNextClick}>
            </WeatherInfo>
        </div>
    );
}