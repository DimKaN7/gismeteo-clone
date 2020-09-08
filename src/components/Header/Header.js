import React, {useState, useRef} from 'react';
import {useSpring, animated} from 'react-spring';

import {connect} from 'react-redux';
import {setCity, setLang, setLoading} from '../../actions/actions';

import './Header.css';
import {getImages, getIcon} from '../../services/tools';

function Header(props) {
    const {
        lang, setLang,
        setCity,
        setLoading,
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
        setLoading(true);
        setCity(value);
    }
    const onClick = () => {
        lang === 'ru' ? setLang('en') : setLang('ru');
    }
    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className='header-cont'>
            <div className='header-cont__wrapper' >
                <form onSubmit={(event) => {setValue(''); input.current.blur(); onSubmit(event, value)}}>
                    <input className='header-cont__city' 
                            type='text'
                            ref={input}
                            placeholder={lang === 'ru' ? 'Поиск города' : 'Search city'}
                            onChange={onChange}
                            value={value}/>
                </form>
                <div className='lang-cont' onClick={onClick}>
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
    setCity,
    setLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);