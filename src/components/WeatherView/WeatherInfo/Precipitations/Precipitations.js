import React from 'react';

import './Precipitations.css';

export default function Precipitations(props) {
    // const {precipitations} = props;
    const precipitations = [
        '0', '0', '1', '0', 
        '0', '1', '0', '1'
    ];
    const precipitationsConts = precipitations.map((prec, index) => {
        return (
            <div key={index}
                 style={{color: `${+prec === 0 ? `#CDCDCD` : `black`}`}}>
                    {prec}
            </div>
        );
    });
    
    return (
        <div className='precipitations-cont'>
            <div className='precipitations-cont-header'>
                <span>Осадки, мм</span>
            </div>
            <div className='precipitations-cont-mount'>
                {precipitationsConts}
            </div>
        </div>
    );
}