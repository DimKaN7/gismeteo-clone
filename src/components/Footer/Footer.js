import React from 'react';

import './Footer.css';
import {getImages, getIcon} from '../../services/tools';
import {links} from '../../services/labels';

export default function Footer() {
    const context = require.context('../../icons/others/', false, /\.(png)$/);
    const iconsPaths = getImages(context);
    const icons = [0, 1, 2, 3].map(el => {
        return (
            <a href={links[el]} 
                target='_blank'
                rel="noopener noreferrer"
                key={el}>
                <img src={getIcon(iconsPaths, el.toString())}></img>      
            </a>
        );
    });

    return (
        <div class='footer-cont'>
            <div className='footer-content'>
                {icons}
            </div>
        </div>
    );
}