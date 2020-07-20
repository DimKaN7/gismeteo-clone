import React from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import useFetch from '../../services/useFetch';

export default function App() {
    const [weather, loading] = useFetch(2023469);
    return (
        <div className='app-main-container'>
            <Header></Header>
            <h1>Weather in Irkutsk</h1>
            {
                loading 
                ?   <div>loading...</div>
                :   <WeatherView weather={weather}></WeatherView>
            }
        </div>
    );
}