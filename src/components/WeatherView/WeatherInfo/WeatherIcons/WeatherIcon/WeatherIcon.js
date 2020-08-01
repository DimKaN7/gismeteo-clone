import React from 'react';
import {useTransition, animated} from 'react-spring';

import './WeatherIcon.css';

import {getImages, getIcon} from '../../../../../services/tools';

export default function WeatherIcon(props) {
    let {selectedTab, weatherIcons} = props;
    weatherIcons = weatherIcons.map((icon, index) => {
        return {id: index, icon: icon}
    });
    // console.log(weatherIcons);
    const context = require.context('../../../../../icons/weather/', false, /\.(svg)$/);
    const iconsPaths = getImages(context);
    
    const transitions = useTransition(weatherIcons[selectedTab], icon => icon.id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {
            duration: 400,
            easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        }
    });
    const animCont = transitions.map(({item, key, props}) => 
        <animated.div key={key} className='anim-cont' style={props}>
            <img src={getIcon(iconsPaths, item.icon)}></img>
        </animated.div>
    );

    return (
        <div className='icon-cont'>
            {animCont}
        </div>
    );
}