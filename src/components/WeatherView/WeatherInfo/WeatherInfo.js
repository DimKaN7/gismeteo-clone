import React from 'react';
import {useSpring, animated} from 'react-spring';

import './WeatherInfo.css';

import Times from './Times/Times';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import ValueBoxes from './ValueBoxes/ValueBoxes';
import WindSpeed from './WindSpeed/WindSpeed';
import Precipitations from './Precipitations/Precipitations';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import {round, getWeatherIcon} from '../../../services/tools';
import Loader from '../../Loader/Loader';

export default function WeatherInfo(props) {
    const {weather, loading, selectedTab, onPrevClick, onNextClick} = props;
    // console.log(selectedTab);
    const animProps = useSpring({
        from: {
            transform: `translate3d(0px, 0px, 0px)`,
        },
        to: {
            transform: `translate3d(${selectedTab * 223 + round(selectedTab/3, 0)}px, 0px, 0px)`,
        },
        config: {
            duration: 400,
            easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        }
    });
    if (loading) {
        return (
            <div className='info-cont'>
                <div className='info-main loading'>
                    <Loader></Loader>
                </div>
                <div className='info-additional'></div>
                <div className='info-additional'></div>
                <div className='info-additional'></div>
            </div>
        );
    }
    else {
        // console.log(weather);
        const dayWeather = weather.slice(8 * selectedTab, 8 * (selectedTab + 1));
        // console.log(dayWeather);
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
        // console.log(weatherIcons);
        const times = dayWeather.map(w => w.timeLocal);

        return (
            <div className='info-cont'>
                <div className='connection-cont'>
                    <animated.div className='connection' style={animProps}></animated.div>
                </div>
                <div className='info-main'>
                    <Times times={times}></Times>
                    <WeatherIcons weatherIcons={weatherIcons} selectedTab={selectedTab}></WeatherIcons>
                    <ValueBoxes values={temps}></ValueBoxes>
                    <WindSpeed speedInfo={speedInfo}></WindSpeed>
                    <Precipitations precipitations={precipitations}></Precipitations>
                </div>
                <AdditionalInfo type={'pressure'}
                                date={date}
                                times={times}
                                values={pressures}
                                selectedTab={selectedTab}
                                onPrevClick={onPrevClick}
                                onNextClick={onNextClick}></AdditionalInfo>
                <AdditionalInfo type={'humidity'}
                                date={date}
                                times={times}
                                values={humidities}
                                selectedTab={selectedTab}
                                oneLine={true}
                                onPrevClick={onPrevClick}
                                onNextClick={onNextClick}></AdditionalInfo>
                <AdditionalInfo type={'visibility'}
                                date={date}
                                times={times}
                                values={visibilities}
                                selectedTab={selectedTab}
                                oneLine={true}
                                onPrevClick={onPrevClick}
                                onNextClick={onNextClick}></AdditionalInfo>
            </div>
        );
    }
}