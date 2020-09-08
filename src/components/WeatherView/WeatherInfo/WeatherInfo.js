import React from 'react';
import {connect} from 'react-redux';

import './WeatherInfo.css';

import Times from './Times/Times';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import ValueBoxes from './ValueBoxes/ValueBoxes';
import WindSpeed from './WindSpeed/WindSpeed';
import Precipitations from './Precipitations/Precipitations';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import {round, getWeatherIcon} from '../../../services/tools';

function WeatherInfo(props) {
    const {
        scroll,
        weather,
        width, 
        loading,
        selectedTab,
    } = props;

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
                            <WeatherIcons weatherIcons={weatherIcons}></WeatherIcons>
                            <ValueBoxes values={temps}></ValueBoxes>
                            <WindSpeed speedInfo={speedInfo}></WindSpeed>
                            <Precipitations precipitations={precipitations}></Precipitations> 
                        </div>
                    </div>
                    <AdditionalInfo type={'pressure'}
                                    mobile={width < 670}
                                    date={date}
                                    times={times}
                                    values={pressures}
                                    scroll={scroll}></AdditionalInfo>
                    <AdditionalInfo type={'humidity'}
                                    mobile={width < 670}
                                    date={date}
                                    times={times}
                                    values={humidities}
                                    oneLine={true}
                                    scroll={scroll}></AdditionalInfo>
                    <AdditionalInfo type={'visibility'}
                                    mobile={width < 670}
                                    date={date}
                                    times={times}
                                    values={visibilities}
                                    oneLine={true}
                                    scroll={scroll}></AdditionalInfo>
                </div>       
            </div>
        );
    }
}

const mapStateToProps = ({weather, width, loading, selectedTab}) => {
    return {
        weather, width, loading, selectedTab
    }
}

export default connect(mapStateToProps)(WeatherInfo);