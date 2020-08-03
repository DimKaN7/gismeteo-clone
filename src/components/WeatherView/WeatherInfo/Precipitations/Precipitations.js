import React from 'react';

import './Precipitations.css';

import AnimatedSpan from '../../AnimatedSpan/AnimatedSpan';
import {titles} from '../../../../services/labels';

export default function Precipitations(props) {
    const {precipitations, lang} = props;
    const precipitationsConts = precipitations.map((prec, index) => {
        return (
            <div key={index}
                 style={{color: `${+prec === 0 ? `#CDCDCD` : `black`}`}}>
                    <AnimatedSpan value={prec} withPlus={false} decimals={1}></AnimatedSpan>
            </div>
        );
    });
    
    return (
        <div className='precipitations-cont'>
            <div className='precipitations-cont-header'>
                <span>{titles[lang]['precipitations']}</span>
            </div>
            <div className='precipitations-cont-mount'>
                {precipitationsConts}
            </div>
        </div>
    );
}