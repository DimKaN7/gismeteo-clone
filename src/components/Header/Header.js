import React, {useState, useRef} from 'react';
import {useSpring, animated} from 'react-spring';

import {connect} from 'react-redux';
import {setLang, setLoading} from '../../actions/actions';

import './Header.css';
import {getImages, getIcon} from '../../services/tools';
import gps from '../../icons/others/header/gps.png';

function Header(props) {
    const {
        lang, setLang,
        setLoading,
        onLocationClick,
        updateCity,
    } = props;
    const context = require.context('../../icons/others/header/', false, /\.(svg)$/);
    const iconsPaths = getImages(context);
    const [value, setValue] = useState('');
    const input = useRef(null);

    const {opacity, transform} = useSpring({
        opacity: lang === 'ru' ? 1 : 0,
        transform: `perspective(30px) rotateX(${lang === 'ru' ? 180 : 0}deg)`,
        config: { 
            duration: 400,
            easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        }
    });

    const onSubmit = (event, value) => {
        event.preventDefault();
        setValue(''); 
        input.current.blur(); 
        setLoading(true);
        updateCity(value);
        // localStorage.setItem('city', value);
    }
    const onLangClick = () => {
        lang === 'ru' ? setLang('en') : setLang('ru');
    }
    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className='header-cont'>
            <div className='header-cont__wrapper' >
                <div className='header-cont__form'>
                    <form onSubmit={(event) => onSubmit(event, value)}>
                        <input className='header-cont__city' 
                                type='text'
                                ref={input}
                                placeholder={lang === 'ru' ? 'Поиск города' : 'Search city'}
                                onChange={onChange}
                                value={value}/>
                    </form>
                    <div className='current-location' onClick={onLocationClick}>
                        <img src={gps} alt='gps'></img>
                    </div>
                </div>
                <div className='lang-cont' onClick={onLangClick}>
                    <animated.a style={{opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)}}>
                        <img src={getIcon(iconsPaths, 'ru')} alt='lang'></img>
                    </animated.a>
                    <animated.a style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
                        <img src={getIcon(iconsPaths, 'en')} alt='lang'></img>
                    </animated.a>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({lang}) => {
    return {
        lang,
    }
}

const mapDispatchToProps = {
    setLang,
    setLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);