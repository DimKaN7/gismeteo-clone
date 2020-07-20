import React from 'react';

import './WeatherTab.css';

import TempertureBox from '../../TempertureBox/TempertureBox';
import getImages from '../../../../services/getImage';
import {titles, daysOfWeek, months} from './labels';

export default function WeahterTab(props) {
    const {isFirst, title, stat} = props;
    const {date, minTemp, maxTemp, precipitations} = stat;
    const dayOfWeek = date.getUTCDay();
    const dayNum = date.getUTCDate();
    const month = date.getUTCMonth();

    const context = require.context('../../../../icons/', false, /\.(svg)$/);
    const icons = getImages(context);

    const minTempTitle = minTemp >= 0 ? `+${minTemp}` : `-${minTemp}`;
    const maxTempTitle = maxTemp >= 0 ? `+${maxTemp}` : `-${maxTemp}`;

    return (
        <div className={`tab-container ${isFirst && `first`}`}>
            <div className='tab-content'>
                <span className='tab-content__date'>{`${daysOfWeek[dayOfWeek]}, ${dayNum} ${months[month]}`}</span>
                <span className='tab-content__day'>{titles[title]}</span>
                <div className='tab-content__temp'>
                    <div className='tab-content__temp-n'>
                        <TempertureBox temp={minTempTitle} top={'16'}></TempertureBox>
                    </div>
                    <div className='tab-content__temp-d'>
                        <TempertureBox temp={maxTempTitle}></TempertureBox>
                    </div>
                </div>
            </div>
            <div className='tab-visual'>
                <div className='tab-visual__icon'>
                    <img src={icons[4]}></img>
                </div>
                <div className='tab-visual__text'>{`${precipitations} мм`}</div>
            </div>
        </div>
    );
}