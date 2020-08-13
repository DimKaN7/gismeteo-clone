import React from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    const {
        weather, width, lang, scroll, loading,
        selectedTab, onTabClick, onPrevClick, 
        onNextClick
    } = props;

    return (
        <div className='weather-cont'>
            <div ref={scroll} className='tabs-wrapper'>
                <WeatherTabs weather={weather}
                             loading={loading}
                             lang={lang}
                             selectedTab={selectedTab}
                             onTabClick={onTabClick}>
                </WeatherTabs>
            </div>
            <WeatherInfo weather={weather}
                         width={width}
                         loading={loading}
                         lang={lang}
                         selectedTab={selectedTab}
                         onPrevClick={onPrevClick}
                         onNextClick={onNextClick}>
            </WeatherInfo>
        </div>
    );
}