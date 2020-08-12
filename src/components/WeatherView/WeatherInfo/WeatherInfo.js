import React, {useState, useEffect} from 'react';

import './WeatherInfo.css';

import Times from './Times/Times';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import ValueBoxes from './ValueBoxes/ValueBoxes';
import WindSpeed from './WindSpeed/WindSpeed';
import Precipitations from './Precipitations/Precipitations';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import {round, getWeatherIcon} from '../../../services/tools';

export default function WeatherInfo(props) {
    const {weather, lang, loading, selectedTab, onPrevClick, onNextClick} = props;
    const [width, setWidth] = useState(0);

    const updateWidth = () => {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        // let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
        console.log(windowWidth);
        setWidth(windowWidth);
    }

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return function cleanup () {
            window.removeEventListener('resize', updateWidth);
        }
    }, []);

    if (loading) {
        return (
            <div className='info-cont'>
                <div className='info-main loading'></div>
                <div className='info-additional'></div>
                <div className='info-additional'></div>
                <div className='info-additional'></div>
            </div>
        );
    }
    else {
        const dayWeather = weather.slice(8 * selectedTab, 8 * (selectedTab + 1));
        const temps = dayWeather.map(w => round(w.main.temp, 0));
        const speedInfo = dayWeather.map(w => {
            return {
                speed: round(w.wind.speed, 0),
                deg: w.wind.deg
            }
        });
        const precipitations = dayWeather.map(w => w.rain ? round(w.rain['3h'], 1) : 0);
        const pressures = dayWeather.map(w => round(w.main.pressure / 1.333, 0));
        const humidities = dayWeather.map(w => w.main.humidity);
        const visibilities = dayWeather.map(w => round(w.visibility/1000, 0));
        const date = new Date(dayWeather[dayWeather.length - 1].dt * 1000);
        const weatherIcons = weather.map(w => getWeatherIcon(w));
        const times = dayWeather.map(w => w.timeLocal);

        return (
            <div className='info-cont'>
                <div style={{width: '100%', height: '100%'}}>
                    <div className='info-main'>
                        <div className='info-main-wrapper'>
                            <Times times={times}></Times>
                            <WeatherIcons weatherIcons={weatherIcons} selectedTab={selectedTab}></WeatherIcons>
                            <ValueBoxes values={temps}></ValueBoxes>
                            <WindSpeed speedInfo={speedInfo} lang={lang}></WindSpeed>
                            <Precipitations precipitations={precipitations} lang={lang}></Precipitations> 
                        </div>
                    </div>
                    <AdditionalInfo type={'pressure'}
                                    mobile={width < 670}
                                    date={date}
                                    times={times}
                                    values={pressures}
                                    lang={lang}
                                    selectedTab={selectedTab}
                                    onPrevClick={onPrevClick}
                                    onNextClick={onNextClick}></AdditionalInfo>
                    <AdditionalInfo type={'humidity'}
                                    mobile={width < 670}
                                    date={date}
                                    times={times}
                                    values={humidities}
                                    lang={lang}
                                    selectedTab={selectedTab}
                                    oneLine={true}
                                    onPrevClick={onPrevClick}
                                    onNextClick={onNextClick}></AdditionalInfo>
                    <AdditionalInfo type={'visibility'}
                                    mobile={width < 670}
                                    date={date}
                                    times={times}
                                    values={visibilities}
                                    lang={lang}
                                    selectedTab={selectedTab}
                                    oneLine={true}
                                    onPrevClick={onPrevClick}
                                    onNextClick={onNextClick}></AdditionalInfo>
                </div>       
            </div>
        );
    }
}