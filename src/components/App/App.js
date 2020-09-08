import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import {getNeededData} from '../../services/tools';
import {notificationsTexts, startCity} from '../../services/labels';
import {getInfo} from '../../services/weatherService';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

import {
    setLang, setCity, setLoading, 
    setWeather, setWidth, setSelectedTab,
} from '../../actions/actions';

function App(props) {
    const apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
    const apiKey = 'abac1141b934536baef9782b2a0e7327';

    const {
        lang,
        city, setCity,
        loading, setLoading,
        setWeather,
        setWidth,
        selectedTab, setSelectedTab,
    } = props;
    const [height, setHeight] = useState(0);
    const [showNot, setShowNot] = useState(false);
    const [not, setNot] = useState('');
    const [online, toogleOnline] = useState(navigator.onLine);

    const scroll = useRef(null);

    const weatherTitle = `${city.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).reduce((sum, val) => sum + ' ' + val)}`

    const updateWidth = () => {
        const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        const windowHeight = typeof window !== "undefined" ? window.outerHeight : 0;
        setWidth(windowWidth);
        setHeight(windowHeight);
    }
    const updateOnline = () => {
        toogleOnline(navigator.onLine);
    }

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        window.addEventListener('load', updateOnline);
        window.addEventListener('online', updateOnline);
        window.addEventListener('offline', updateOnline);
        return () => {
            window.removeEventListener('resize', updateWidth);
            window.addEventListener('load', updateOnline);
            window.addEventListener('online', updateOnline);
            window.addEventListener('offline', updateOnline);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (online) {
                getInfo(`${apiBase}q=${city}&units=metric&lang=${lang}&appid=${apiKey}`)
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
                    <Loader />
                </>
            }
            {
                showNot && 
                <div className='not-wrapper'>
                    {notificationsTexts[not][lang]}
                </div>
            }
            <Header />
            <h1>{weatherTitle}</h1>
            <WeatherView scroll={scroll}
                         selectedTab={selectedTab} />
            <Footer height={height} />
        </div>
    );
}

const mapStateToProps = ({lang, city, loading, weather, width, selectedTab}) => {
    return {
        lang,
        city,
        loading,
        weather,
        width,
        selectedTab,
    }
}

const mapDispatchToProps = {
    setLang,
    setCity,
    setLoading,
    setWeather,
    setWidth,
    setSelectedTab,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);