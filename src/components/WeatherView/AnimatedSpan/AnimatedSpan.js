import React from 'react';
import {useSpring, animated} from 'react-spring';

import './AnimatedSpan.css';

import {round} from '../../../services/tools';

export default function AnimatedSpan(props) {
    const {value, withPlus, decimals = 0} = props;

    const animProps = useSpring(
        {
            from: {number: 0},
            to: {number: +value}, 
            config: {
                duration: 400,
                easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            },
        }
    );

    return (
        <div className='animated-cont'>
            {+value && withPlus > 0 ? <span>+</span> : null}
            <animated.span>{animProps.number.interpolate(x => round(x, decimals))}</animated.span>
        </div>
    );
}