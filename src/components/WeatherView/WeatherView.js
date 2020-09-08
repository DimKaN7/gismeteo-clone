import React from 'react';

import './WeatherView.css';

import WeatherTabs from './WeatherTabs/WeatherTabs';
import WeatherInfo from './WeatherInfo/WeatherInfo';

export default function WeatherView(props) {
    const {
        scroll,
    } = props;

    return (
        <div className='weather-cont'>
            <div ref={scroll} className='tabs-wrapper'>
                <WeatherTabs scroll={scroll}></WeatherTabs>
            </div>
            <WeatherInfo scroll={scroll} />
        </div>
    );
}