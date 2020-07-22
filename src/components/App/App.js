import React, {useState} from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import Loader from '../Loader/Loader';
import useFetch from '../../services/useFetch';

export default function App() {
    const [weather, loading] = useFetch(2023469);
    const [selectedTab, setSelectedTab] = useState(0);

    const onTabClick = (newTab) => {
        if (newTab != selectedTab) {
            setSelectedTab(newTab);
        }
    }
    const onPrevClick = () => {
        const newTab = selectedTab - 1;
        setSelectedTab(newTab);
    }
    const onNextClick = () => {
        const newTab = selectedTab + 1;
        setSelectedTab(newTab);
    }

    return (
        <div className='app-main-container'>
            <Header></Header>
            <h1>Weather in Irkutsk</h1>
            {
                loading 
                ?   <Loader></Loader>
                :   <WeatherView weather={weather}
                                 selectedTab={selectedTab}
                                 onTabClick={onTabClick}
                                 onPrevClick={onPrevClick}
                                 onNextClick={onNextClick}></WeatherView>
            }
        </div>
    );
}