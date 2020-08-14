import React from 'react';

import './Footer.css';
import {getImages, getIcon} from '../../services/tools';
import {links} from '../../services/labels';

export default function Footer({height}) {
    const context = require.context('../../icons/others/footer/', false, /\.(png)$/);
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

    // if height is too big, we need to place footer to the bottom of the page
    const style = {
        marginTop: height > 1395 ? '0' : '50px',
        position: height > 1395 ? 'absolute' : 'relative',
        top: height > 1395 ? `${height - 40}px` : '',
    }

    return (
        <div className='footer-cont' style={style}>
            <div className='footer-content'>
                {icons}
            </div>
        </div>
    );
}