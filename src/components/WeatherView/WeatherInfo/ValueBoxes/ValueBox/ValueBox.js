import React from 'react';

import './ValueBox.css';

import AnimatedSpan from '../../../AnimatedSpan/AnimatedSpan';

export default function ValueBox(props) {
    const {value, top, type} = props;
    const color = type === 'temp' ? '#FDEEC1' : 
                  type === 'pressure' ? '#F3DDF5' :
                  type === 'humidity' ? '#84C6F1' : 
                  '#F0F0F0';

    const style = {
        backgroundColor: `${color}`,
        fontWeight: `${type === 'temp' ? '500' : '400'}`,
        fontSize:  `${type === 'temp' ? '22px' : '18px'}`,
        transform: `translateY(${top}px)`,
    }

    return (
        <div className='value-box'
             style={style}>
            <AnimatedSpan value={value} withPlus={type === 'temp'}></AnimatedSpan>
        </div>
    );
}