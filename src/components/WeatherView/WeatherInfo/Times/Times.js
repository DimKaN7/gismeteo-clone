import React from 'react';

import './Times.css';

export default function Times() {
    const timesLabels = [
        '2', '5', '8', '11', '14', '17', '20', '23'
    ];
    const times = timesLabels.map((time, index) => {
        return (
            <div key={index} className='times-time'>
                <span>{time}</span>
                <sup>00</sup>
            </div>
        );
    });

    return (
        <div className='times-cont'>
            {times}
        </div>
    );
}