import React from 'react';
import {useSpring, animated} from 'react-spring';

import './ValueBox.css';

import AnimatedSpan from '../../../AnimatedSpan/AnimatedSpan';

export default function ValueBox(props) {
    const {value, top, type, topFixed=false} = props;
    const color = type === 'temp' ? '#FDEEC1' : 
                  type === 'pressure' ? '#F3DDF5' :
                  type === 'humidity' ? '#84C6F1' : 
                  '#F0F0F0';

    const animProps = useSpring({
        from: {
            transform: `${topFixed ? `translate3d(0, ${top}px, 0)` : `translate3d(0, 46px, 0)`}`,
            backgroundColor: `${color}`,
            fontWeight: `${type === 'temp' ? '500' : '400'}`,
            fontSize:  `${type === 'temp' ? '22px' : '18px'}`,
        },
        to: {
            transform: `${topFixed ? `translate3d(0, ${top}px, 0)` : `translate3d(0, ${top}px, 0)`}`,
            backgroundColor: `${color}`,
            fontWeight: `${type === 'temp' ? '500' : '400'}`,
            fontSize:  `${type === 'temp' ? '22px' : '18px'}`,
        },
        config: {
            duration: 400,
            easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        }
    });

    return (
        <animated.div className='value-box'
             style={animProps}>
            <AnimatedSpan value={value} withPlus={type === 'temp'}></AnimatedSpan>
        </animated.div>
    );
}