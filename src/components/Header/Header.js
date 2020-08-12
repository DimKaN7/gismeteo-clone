import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';

import './Header.css';
import {getImages, getIcon} from '../../services/tools';

export default function Header(props) {
    const {onSubmit, onLangClick, lang} = props;
    const context = require.context('../../icons/others/header/', false, /\.(svg)$/);
    const iconsPaths = getImages(context);
    const [value, setValue] = useState('');

    const {opacity, transform} = useSpring({
        opacity: lang === 'ru' ? 1 : 0,
        transform: `perspective(30px) rotateX(${lang === 'ru' ? 180 : 0}deg)`,
        config: { 
            duration: 400,
            easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        }
    });

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className='header-cont'>
            <div className='header-cont__wrapper' >
                <form onSubmit={(event) => {setValue(''); onSubmit(event, value)}}>
                    <input className='header-cont__city' 
                            type='text'
                            placeholder={lang === 'ru' ? 'Поиск города' : 'Search city'}
                            onChange={onChange}
                            value={value}/>
                </form>
                <div className='lang-cont' onClick={onLangClick}>
                    <animated.a style={{opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)}}>
                         <img src={getIcon(iconsPaths, 'ru')}></img>
                    </animated.a>
                    <animated.a style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
                         <img src={getIcon(iconsPaths, 'en')}></img>
                    </animated.a>
                </div>
            </div>
        </div>
    );
}