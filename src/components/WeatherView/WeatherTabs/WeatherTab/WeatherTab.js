import React from 'react';

import './WeatherTab.css';

import ValueBox from '../../WeatherInfo/ValueBoxes/ValueBox/ValueBox';
import {getImages, getIcon} from '../../../../services/tools';
import {daysTitles, units} from '../../../../services/labels';
import AnimatedSpan from '../../AnimatedSpan/AnimatedSpan';
import Marquee from '../../../Marquee/Marquee';

export default function WeahterTab(props) {
    const {isSelected} = props.properties;
    if (props.loading) {
        return (
            <div className='tab-container loading'></div>
        );
    }
    else {
        const {lang} = props;
        const {title, stat, onTabClick} = props.properties;
        const {dayTitle, minTemp, maxTemp, precipitations, maxFrequentIcon} = stat;

        const context = require.context('../../../../icons/weather/', false, /\.(svg)$/);
        const icons = getImages(context);
        const icon = getIcon(icons, maxFrequentIcon);

        const minTempTitle = minTemp > 0 ? `+${minTemp}` : `${minTemp}`;
        const maxTempTitle = maxTemp > 0 ? `+${maxTemp}` : `${maxTemp}`;
        const className = () => {
            let name = 'tab-container';
            if (isSelected) name += ' selected';
            return name;
        }

        return (
            <div className={className()}
                onClick={() => onTabClick(title)}
                >
                <div className='tab-content'>
                    <Marquee string={dayTitle}></Marquee>
                    {/* <span>asdasdasd</span> */}
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