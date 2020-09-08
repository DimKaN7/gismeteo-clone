import React from 'react';
import {connect} from 'react-redux';

import './Precipitations.css';

import AnimatedSpan from '../../AnimatedSpan/AnimatedSpan';
import {titles} from '../../../../services/labels';

function Precipitations(props) {
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

const mapStateToProps = ({lang}) => {
    return {
        lang,
    }
}

export default connect(mapStateToProps)(Precipitations);