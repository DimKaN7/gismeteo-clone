import React, {useState, useEffect, useRef} from 'react';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import {getNeededData} from '../../services/tools';
import {notificationsTexts, startCity} from '../../services/labels';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

export default function App() {
    const apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
    const apiKey = 'abac1141b934536baef9782b2a0e7327';

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [lang, setLang] = useState('ru');
    const [city, setCity] = useState(startCity['ru']);
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [showNot, setShowNot] = useState(false);
    const [not, setNot] = useState('');
    const [online, toogleOnline] = useState(navigator.onLine);

    const scroll = useRef(null);

    const weatherTitle = `${city.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).reduce((sum, val) => sum + ' ' + val)}`

    const onTabClick = (newTab) => {
        if (newTab !== selectedTab) {
            scroll.current.scrollLeft = 223 * newTab + 107 - (width - 20)/2;
            setSelectedTab(newTab);
        }
    }
    const onPrevClick = () => {
        const newTab = selectedTab - 1;
        scroll.current.scrollLeft = 223 * newTab + 107 - (width - 20)/2;
        setSelectedTab(newTab);
    }
    const onNextClick = () => {
        const newTab = selectedTab + 1;
        scroll.current.scrollLeft = 223 * newTab + 107 - (width - 20)/2;
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
    const updateWidth = () => {
        const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        const windowHeight = typeof window !== "undefined" ? window.outerHeight : 0;
        // console.log(windowHeight);
        setWidth(windowWidth);
        setHeight(windowHeight);
    }

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        window.addEventListener('load', () => {
            toogleOnline(navigator.onLine);
        });
        window.addEventListener('online', () => {
            toogleOnline(true);
        });
        window.addEventListener('offline', () => {
            toogleOnline(false);
        });
        return function cleanup () {
            window.removeEventListener('resize', updateWidth);
            window.addEventListener('load', () => {
                toogleOnline(navigator.onLine);
            });
            window.addEventListener('online', () => {
                toogleOnline(true);
            });
            window.addEventListener('offline', () => {
                toogleOnline(false);
            });
            window.addEventListener('fetch', () => {
                console.log('fetching');
            });
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (online) {
                getInfo()
                .then((json) => {
                    setWeather(getNeededData(json));
                    setLoading(false);
                })
                .catch(() => {
                    setNot('notFound');
                    setShowNot(true);
                    setCity(startCity[lang]);
                });
            }
        }, 500);
        setSelectedTab(0);
        scroll.current.scrollLeft = 0;
    }, [city, online]);

    useEffect(() => {
        setTimeout(() => {
            setShowNot(false);
        }, 2000);
    }, [showNot]);

    useEffect(() => {
        if (online) setNot('connRestore');
        else setNot('noConn');
        setShowNot(true);
    }, [online]);

    return (
        <div className='app-main-container'>
            {
                loading &&
                <>
                    <div className='loader-wrapper'></div>
                    <Loader></Loader>
                </>
            }
            {
                showNot && 
                <div className='not-wrapper'>
                    {notificationsTexts[not][lang]}
                </div>
            }
            <Header onSubmit={onSubmit} 
                    onLangClick={onLangClick}
                    lang={lang}></Header>
            <h1>{weatherTitle}</h1>
            <WeatherView weather={weather}
                         width={width}
                         loading={loading}
                         lang={lang}
                         scroll={scroll}
                         selectedTab={selectedTab}
                         onTabClick={onTabClick}
                         onPrevClick={onPrevClick}
                         onNextClick={onNextClick}></WeatherView>
            <Footer height={height}></Footer>
        </div>
    );
}