import React from 'react';
import {useSpring, animated} from 'react-spring';

import './ValueBox.css';

import AnimatedSpan from '../../../AnimatedSpan/AnimatedSpan';

export default function ValueBox(props) {
    const {value, top, type} = props;
    // console.log(+('+21'));
    const color = type === 'temp' ? '#FDEEC1' : 
                  type === 'pressure' ? '#F3DDF5' :
                  type === 'humidity' ? '#84C6F1' : 
                  '#F0F0F0';
    const styles = {
        valueBox: {
            backgroundColor: `${color}`,
            position: 'relative',
            top: `${top}px`,
            fontWeight: `${type === 'temp' ? '500' : '400'}`,
            fontSize:  `${type === 'temp' ? '22px' : '18px'}`,
        }
    };

    return (
        <div className='value-box'
             style={styles.valueBox}>
            <AnimatedSpan value={value} withPlus={type === 'temp'}></AnimatedSpan>
        </div>
    );
}