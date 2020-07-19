import React from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';

export default function App() {
    return (
        <div className='app-main-container'>
            {/* {Header} с поиском и нзванием города */}
            <Header></Header>
             {/* {WeatherForm} */}
            <WeatherView></WeatherView>
        </div>
    );
}