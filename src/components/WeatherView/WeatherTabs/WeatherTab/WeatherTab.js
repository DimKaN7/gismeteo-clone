import React from 'react';

import './WeatherTab.css';

export default function WeahterTab(props) {
    const {first} = props;
    return (
        <div className={`tab-container ${first && `first`}`}>

        </div>
    );
}