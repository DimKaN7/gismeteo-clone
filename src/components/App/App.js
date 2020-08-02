import React, {useState, useEffect} from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import {getNeededData} from '../../services/tools';

export default function App() {
    const apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
    const apiKey = 'abac1141b934536baef9782b2a0e7327';

    const [city, setCity] = useState('Irkutsk');
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [showError, setShowError] = useState(false);

    const onTabClick = (newTab) => {
        if (newTab !== selectedTab) {
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
    const onSubmit = (event, value) => {
        event.preventDefault();
        setLoading(true);
        setCity(value);
    }

    useEffect(() => {
        setTimeout(() => {
            fetch(`${apiBase}q=${city}&units=metric&lang=ru&appid=${apiKey}`)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                setWeather(getNeededData(json));
                setLoading(false);
            })
            .catch((err) => {
                // alert('City not found! Switching to Irkutsk.');
                setShowError(true);
                setCity('Irkutsk');
            });
        }, 2000);
        setSelectedTab(0);
    }, [city]);

    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);

    return (
        <div className='app-main-container'>
        {showError && 
            <div className='error-cont'>City not found, switching to Irkutsk</div>
        }
        <Header onSubmit={onSubmit} loading={loading}></Header>
            <h1>{`Weather in ${city.charAt(0).toUpperCase() + city.slice(1)}`}</h1>
            <WeatherView weather={weather}
                         loading={loading}
                         selectedTab={selectedTab}
                         onTabClick={onTabClick}
                         onPrevClick={onPrevClick}
                         onNextClick={onNextClick}></WeatherView>
        </div>
    );
}