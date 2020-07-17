import React, {useState} from 'react';

import './WeatherTabs.css';

import WeahterTab from './WeatherTab/WeatherTab';

export default function WeatherTab(props) {
    return (
        <div className='tabs-container'>
            <WeahterTab first={true}></WeahterTab>
            <WeahterTab></WeahterTab>
            <WeahterTab></WeahterTab>
        </div>
    );
}