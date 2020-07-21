import React, {useState} from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import useFetch from '../../services/useFetch';

export default function App() {
    const [weather, loading] = useFetch(2023469);
    const [selectedTab, setSelectedTab] = useState(0);

    function onTabClick(newTab) {
        if (newTab != selectedTab) {
            setSelectedTab(newTab);
        }
    }

    return (
        <div className='app-main-container'>
            <Header></Header>
            <h1>Weather in Irkutsk</h1>
            {
                loading 
                ?   <div>loading...</div>
                :   <WeatherView weather={weather}
                                 selectedTab={selectedTab}
                                 onTabClick={onTabClick}></WeatherView>
            }
        </div>
    );
}