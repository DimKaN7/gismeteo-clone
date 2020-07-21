import React from 'react';

import './WindSpeed.css';

export default function WindSpeed(props) {
    const {speeds} = props;
    const speedConts = speeds.map((speed, index) => {
        const background = speed < 3
                           ? 'linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(235, 236, 237, 1) 30%)' 
                           : 'linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(255, 235, 170, 1) 30%)';

        return (
            <div key={index} className='wind-speed'>
                <div style={{background: background}}>{speed}</div>
            </div>
        );
    });

    return (
        <div className='wind-cont'>
            <div className='wind-cont-header'>
                <span>Скорость ветра, м/с</span>
            </div>
            <div className='wind-cont-speed'> 
                {speedConts}
            </div>
        </div>
    );
}