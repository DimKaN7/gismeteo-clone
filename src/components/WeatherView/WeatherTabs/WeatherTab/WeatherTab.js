import React from 'react';
import {connect} from 'react-redux';

import './WeatherTab.css';

import {setSelectedTab} from '../../../../actions/actions';

import ValueBox from '../../WeatherInfo/ValueBoxes/ValueBox/ValueBox';
import {getImages, getIcon} from '../../../../services/tools';
import {daysTitles, units} from '../../../../services/labels';
import AnimatedSpan from '../../AnimatedSpan/AnimatedSpan';
import Marquee from '../../../Marquee/Marquee';

function WeatherTab(props) {
    if (props.loading) {
        return (
            <div className='tab-container loading'></div>
        );
    }
    else {
        const {lang, width, scroll,
            selectedTab, setSelectedTab} = props;
        const {title, stat} = props.properties;
        const {dayTitle, minTemp, maxTemp, precipitations, maxFrequentIcon} = stat;

        const context = require.context('../../../../icons/weather/', false, /\.(svg)$/);
        const icons = getImages(context);
        const icon = getIcon(icons, maxFrequentIcon);

        const minTempTitle = minTemp > 0 ? `+${minTemp}` : `${minTemp}`;
        const maxTempTitle = maxTemp > 0 ? `+${maxTemp}` : `${maxTemp}`;
        
        const className = () => {
            let name = 'tab-container';
            if (title === selectedTab) name += ' selected';
            return name;
        }
        const onClick = (newTab) => {
            if (newTab !== selectedTab) {
                scroll.current.scrollLeft = 223 * newTab + 107 - (width - 20)/2;
                setSelectedTab(newTab);
            }
        }

        return (
            <div className={className()}
                onClick={() => onClick(title)}
                >
                <div className='tab-content'>
                    <Marquee string={dayTitle}></Marquee>
                    <span className='tab-content__day'>{daysTitles[lang][title]}</span>
                    <div className='tab-content__temp'>
                        <div className='tab-content__temp-n'>
                            <ValueBox value={minTempTitle} top={'16'} type={'temp'}></ValueBox>
                        </div>
                        <div className='tab-content__temp-d'>
                            <ValueBox value={maxTempTitle} top={'0'} type={'temp'}></ValueBox>
                        </div>
                    </div>
                </div>
                <div className='tab-visual'>
                    <div className='tab-visual__icon'>
                        <img src={icon} alt='weather'></img>
                    </div>
                    <div className='tab-visual__text'>
                        <AnimatedSpan value={precipitations} withPlus={false} decimals={1}></AnimatedSpan>
                        <span>&nbsp;{units[lang]['precipitations']}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({lang, loading, selectedTab, width}) => {
    return {
        lang,
        loading, 
        selectedTab,
        width,
    }
}

const mapDispatchToProps = {
    setSelectedTab,
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherTab);