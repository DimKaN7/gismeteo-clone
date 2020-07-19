import React from 'react';

import './WeatherTab.css';

import TempertureBox from '../../TempertureBox/TempertureBox';
import getImages from '../../../../services/getImage';

export default function WeahterTab(props) {
    const {isFirst} = props;
    const context = require.context('../../../../icons/', false, /\.(svg)$/);
    const icons = getImages(context);
    // console.log(icons);

    return (
        <div className={`tab-container ${isFirst && `first`}`}>
            <div className='tab-content'>
                <span className='tab-content__date'>Пт, 17 июля</span>
                <span className='tab-content__day'>Сегодня</span>
                <div className='tab-content__temp'>
                    <div className='tab-content__temp-n'>
                        <TempertureBox temp={'+8'} top={'16'}></TempertureBox>
                    </div>
                    <div className='tab-content__temp-d'>
                        <TempertureBox temp={'+22'}></TempertureBox>
                    </div>
                </div>
            </div>
            <div className='tab-visual'>
                <div className='tab-visual__icon'>
                    <img src={icons[4]}></img>
                </div>
                <div className='tab-visual__text'>0,4 мм</div>
            </div>
        </div>
    );
}