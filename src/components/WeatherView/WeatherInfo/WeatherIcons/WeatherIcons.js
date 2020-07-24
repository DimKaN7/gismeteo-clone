import React, { Component } from 'react';

import './WeatherIcons.css';

import {getImages, getIcon} from '../../../../services/tools';

export default function WeatherIcons(props) {
    const {weatherIcons} = props;
    const context = require.context('../../../../icons/weather/', false, /\.(svg)$/);
    const iconsPaths = getImages(context);
    // console.log(iconsPaths);
    const icons = weatherIcons.map((icon, index) => {
        return (
            <div key={index} className='icon-cont'>
                <img src={getIcon(iconsPaths, icon)}></img>
            </div>
        );
    });

    return (
        <div className='icons-cont'>
            {icons}
        </div>
    );
}