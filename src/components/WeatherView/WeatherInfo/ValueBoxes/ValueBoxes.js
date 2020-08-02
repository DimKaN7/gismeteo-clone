import React from 'react';

import './ValueBoxes.css';

import ValueBox from './ValueBox/ValueBox';

export default function ValueBoxes(props) {
    const {values, type='temp', oneLine} = props;
    const valuesNum = values.map((v) => {
        return +v;
    });
    const max = Math.max(...valuesNum);
    const min = Math.min(...valuesNum);
    const minTop = (95 - ((max - min) * 3 + 30))/2;

    const valuesBoxes = values.map((v, index) => {
        let top = 0;
        if (!oneLine) {
            top = minTop + (max - valuesNum[index]) * 3;
        }
        else top = 32.5;
        const value = type === 'temp' ? (v >= 0 ? `+${v}` : `${v}`) : v;

        return (
            <div key={index}>
                <ValueBox value={value}
                          top={top}
                          type={type}></ValueBox>
            </div>
        );
    });

    return (
        <div className='value-boxes-cont'>
            {valuesBoxes}
        </div>
    );
}