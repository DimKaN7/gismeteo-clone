import React from 'react';

import './ValueBoxes.css';

import ValueBox from './ValueBox/ValueBox';

export default function ValueBoxes(props) {
    const {values, type='temp', oneLine} = props;
    const valuesNum = values.map((v) => {
        return +v;
    });
    let height = null;

    const valuesBoxes = values.map((v, index) => {
        let top = 0;
        if (!oneLine) {
            const max = Math.max(...valuesNum);
            const min = Math.min(...valuesNum);
            height = (max - min) * 3 + 30;
            top = (max - valuesNum[index]) * 3;
        }
        const tempVal = type === 'temp' ? (v >= 0 ? `+${v}` : `${v}`) : v;

        return (
            <div key={index}>
                <ValueBox value={tempVal}
                          top={top}
                          type={type}></ValueBox>
            </div>
        );
    });

    return (
        <div className='value-boxes-cont'>
            <div style={{height: `${height ? `${height}px` : 'auto'}`}}
                 className='inner-cont'>
                {valuesBoxes}
            </div>
        </div>
    );
}