import React from 'react';

import './Loader.css';

import {getImages, getIcon} from '../../services/tools';

export default function Loader() {
    const context = require.context('../../icons/weather/', false, /\.(svg)$/);
    const iconsPaths = getImages(context);
    const icon = getIcon(iconsPaths, 'd');

    return (
        <div className='loader-cont'>
            <img src={icon}></img>
        </div>
    );
}