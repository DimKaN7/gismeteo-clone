import React, {useState, useEffect} from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import {getNeededData, getStage} from '../../services/tools';
import {errorTexts, startCity} from '../../services/labels';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

export default function App() {
    const apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
    const apiKey = 'abac1141b934536baef9782b2a0e7327';

    const [lang, setLang] = useState('ru');
    const [city, setCity] = useState(startCity['ru']);
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [showError, setShowError] = useState(false);
    const weatherTitle = `${city.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).reduce((sum, val) => sum + ' ' + val)}`

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
    const onLangClick = () => {
        lang === 'ru' ? setLang('en') : setLang('ru');
    }

    const getInfo = async () => {
        const response = await fetch(`${apiBase}q=${city}&units=metric&lang=${lang}&appid=${apiKey}`);
        const json = await response.json();
        return json;
    }

    useEffect(() => {
        setTimeout(() => {
            getInfo()
            .then((json) => {
                setWeather(getNeededData(json));
                setLoading(false);
            })
            .catch(() => {
                setShowError(true);
                setCity(startCity[lang]);
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
            {
                loading &&
                <div className='loader-cont'>
                    {
                        showError && 
                        <div className='error-cont'>{errorTexts[lang]}</div>
                    }
                    <Loader></Loader>
                </div>
            }
            <Header onSubmit={onSubmit} 
                    onLangClick={onLangClick}
                    lang={lang}></Header>
            <h1>{weatherTitle}</h1>
            <WeatherView weather={weather}
                         loading={loading}
                         lang={lang}
                         selectedTab={selectedTab}
                         onTabClick={onTabClick}
                         onPrevClick={onPrevClick}
                         onNextClick={onNextClick}></WeatherView>
            <Footer></Footer>
        </div>
    );
}