import React from 'react';

import './TempertureBoxes.css';

import TemperatureBox from '../../TempertureBox/TempertureBox';

export default function TempertureBoxes(props) {
    const {temps} = props;
    const tempsNum = temps.map((temp) => {
        return +temp;
    });
    const max = Math.max(...tempsNum);
    const min = Math.min(...tempsNum);
    const height = (max - min) * 3 + 30;

    const tempsBoxes = temps.map((temp, index) => {
        const top = (max - tempsNum[index]) * 3;
        return (
            <div key={index}>
                <TemperatureBox temp={temp}
                                top={top}></TemperatureBox>
            </div>
        );
    });

    return (
        <div className='temp-boxes-cont'>
            <div style={{height: `${height}px`}}
                 className='inner-cont'>
                {tempsBoxes}
            </div>
        </div>
    );
}