import React from 'react';

import './Times.css';

export default function Times(props) {
    const {times} = props;
    const timesLabels = times.map((time, index) => {
        return (
            <div key={index} className='times-time'>
                <span>{time}</span>
                <sup>00</sup>
            </div>
        );
    });

    return (
        <div className='times-cont'>
            {timesLabels}
        </div>
    );
}