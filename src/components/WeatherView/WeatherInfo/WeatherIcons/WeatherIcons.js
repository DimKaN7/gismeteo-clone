import React, { Component } from 'react';

import './WeatherIcons.css';

import getImages from '../../../../services/getImage';

export default function WeatherIcons(props) {
    // const {weatherConds} = props;
    const weatherConds = [
        'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'
    ];
    const context = require.context('../../../../icons/', false, /\.(svg)$/);
    const iconsPaths = getImages(context);
    const icons = weatherConds.map((cond, index) => {
        return (
            <div key={index} className='icon-cont'>
                <img src={iconsPaths[3]}></img>
            </div>
        );
    });

    return (
        <div className='icons-cont'>
            {icons}
        </div>
    );
}