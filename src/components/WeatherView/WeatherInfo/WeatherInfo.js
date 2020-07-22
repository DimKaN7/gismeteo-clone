import React from 'react';

import './WeatherInfo.css';

import Times from './Times/Times';
import WeatherIcons from './WeatherIcons/WeatherIcons';
import ValueBoxes from './ValueBoxes/ValueBoxes';
import WindSpeed from './WindSpeed/WindSpeed';
import Precipitations from './Precipitations/Precipitations';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';

export default function WeatherInfo(props) {
    const {weather, selectedTab, onPrevClick, onNextClick} = props;
    const dayWeather = weather.slice(8 * selectedTab, 8 * (selectedTab + 1));
    // console.log(dayWeather);
    const temps = dayWeather.map(w => Math.round(w.main.temp));
    const speedInfo = dayWeather.map(w => {
        return {
            speed: Math.round(w.wind.speed),
            deg: w.wind.deg
        }
    });
    const precipitations = dayWeather.map(w => w.rain ? Math.round(w.rain['3h'] * 10)/10 : 0);
    const pressures = dayWeather.map(w => Math.round(w.main.pressure / 1.33322));
    const humidities = dayWeather.map(w => w.main.humidity);
    const date = new Date(dayWeather[dayWeather.length - 1].dt * 1000);

    return (
        <div className='info-cont'>
            <div className='info-main'>
                <Times></Times>
                <WeatherIcons></WeatherIcons>
                <ValueBoxes values={temps}></ValueBoxes>
                <WindSpeed speedInfo={speedInfo}></WindSpeed>
                <Precipitations precipitations={precipitations}></Precipitations>
            </div>
            <AdditionalInfo type={'pressure'}
                            date={date}
                            values={pressures}
                            selectedTab={selectedTab}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}></AdditionalInfo>
            <AdditionalInfo type={'humidity'}
                            date={date}
                            values={humidities}
                            selectedTab={selectedTab}
                            oneLine={true}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}></AdditionalInfo>
        </div>
    );
}