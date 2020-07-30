import React from 'react';

import './WeatherTab.css';

import ValueBox from '../../WeatherInfo/ValueBoxes/ValueBox/ValueBox';
import {getImages, getIcon} from '../../../../services/tools';
import {titles, daysOfWeek, months} from '../../../../services/labels';
import AnimatedSpan from '../../AnimatedSpan/AnimatedSpan';
import Loader from '../../../Loader/Loader';

export default function WeahterTab(props) {
    // console.log(props);
    if (props.loading) {
        let name = 'tab-container loading';
        if (props.properties.isFirst) name += ' first';
        return (
            <div className={name}>
                {/* <Loader></Loader> */}
            </div>
        );
    }
    else {
        const {isFirst, isSelected, title, stat, onTabClick} = props.properties;
        const {date, minTemp, maxTemp, precipitations, maxFrequentIcon} = stat;
        const dayOfWeek = date.getUTCDay();
        const dayNum = date.getUTCDate();
        const month = date.getUTCMonth();

        const context = require.context('../../../../icons/weather/', false, /\.(svg)$/);
        const icons = getImages(context);
        const icon = getIcon(icons, maxFrequentIcon);

        const minTempTitle = minTemp > 0 ? `+${minTemp}` : `${minTemp}`;
        const maxTempTitle = maxTemp > 0 ? `+${maxTemp}` : `${maxTemp}`;
        const className = () => {
            let name = 'tab-container';
            if (isFirst) name += ' first';
            if (isSelected) name += ' selected';
            return name;
        }

        return (
            <div className={className()}
                onClick={() => onTabClick(title)}>
                <div className='tab-content'>
                    <span className='tab-content__date'>{`${daysOfWeek[dayOfWeek]}, ${dayNum} ${months[month]}`}</span>
                    <span className='tab-content__day'>{titles[title]}</span>
                    <div className='tab-content__temp'>
                        <div className='tab-content__temp-n'>
                            <ValueBox value={minTempTitle} top={'16'} type={'temp'}></ValueBox>
                        </div>
                        <div className='tab-content__temp-d'>
                            <ValueBox value={maxTempTitle} type={'temp'}></ValueBox>
                        </div>
                    </div>
                </div>
                <div className='tab-visual'>
                    <div className='tab-visual__icon'>
                        <img src={icon}></img>
                    </div>
                    <div className='tab-visual__text'>
                        <AnimatedSpan value={precipitations} withPlus={false} decimals={1}></AnimatedSpan>
                        <span>&nbsp;мм</span>
                    </div>
                </div>
            </div>
        );
    }
}