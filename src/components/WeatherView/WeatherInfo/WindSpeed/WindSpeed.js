import React from 'react';

import './WindSpeed.css';

import {windDirections} from '../../../../services/labels';
import {round} from '../../../../services/tools';
import AnimatedSpan from '../../AnimatedSpan/AnimatedSpan';

export default function WindSpeed(props) {
    const {speedInfo} = props;
    
    const speeds = speedInfo.map(s => s.speed);
    const degs = speedInfo.map(s => s.deg);
    const speedDivs = speeds.map((speed, index) => {
        const background = speed < 3
                           ? 'linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(235, 236, 237, 1) 30%)' 
                           : 'linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(255, 235, 170, 1) 30%)';

        return (
            <div key={index} className='wind-speed'>
                <div style={{background: background}}>
                    <AnimatedSpan value={speed} withPlus={false}></AnimatedSpan>
                </div>
            </div>
        );
    });
    const dirDivs = degs.map((d, index) => {
        const getDirection = (degrees) => {
            return windDirections[round(degrees / 45, 0) % 8];
        }

        return (
            <div key={index} className='wind-dir'>
                <div>{getDirection(d)}</div>
            </div>
        );
    });

    return (
        <div className='wind-cont'>
            <div className='wind-cont-header'>
                <span>Скорость ветра, м/с</span>
            </div>
            <div className='wind-cont-speeds'> 
                {speedDivs}
            </div>
            <div className='wind-cont-directions'>
                {dirDivs}
            </div>
        </div>
    );
}