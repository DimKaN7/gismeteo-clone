import React, {useState} from 'react';

import './AdditionalInfo.css';

import Times from '../Times/Times';
import ValueBoxes from '../ValueBoxes/ValueBoxes';

import {titles, daysOfWeek, months, additionalInfoTitles} from '../../../../services/labels';

export default function AdditionalInfo(props) {
    const [visited, setVisited] = useState('title__button');

    const {values, date, type, selectedTab, 
           oneLine=false, onNextClick, onPrevClick} = props;
    const dayOfWeek = date.getUTCDay();
    const dayNum = date.getUTCDate();
    const month = date.getUTCMonth();
    const dateVal1 = `${daysOfWeek[dayOfWeek]}, ${dayNum} ${months[month]}`
    const dateVal2 = `, ${titles[selectedTab].toLowerCase()}`;
    
    const prevDate = new Date(Date.parse(date.toString()) - 86400000);
    const pDayOfWeek = prevDate.getUTCDay();
    const pDayNum = prevDate.getUTCDate();
    const pMonth = prevDate.getUTCMonth();
    const prevDateLabel = `${daysOfWeek[pDayOfWeek]}, ${pDayNum} ${months[pMonth]}`;

    const nextDate = new Date(Date.parse(date.toString()) + 86400000);
    const nDayOfWeek = nextDate.getUTCDay();
    const nDayNum = nextDate.getUTCDate();
    const nMonth = nextDate.getUTCMonth();
    const nextDateLabel = `${daysOfWeek[nDayOfWeek]}, ${nDayNum} ${months[nMonth]}`;

    const onMouseEnter = () => {
        const v = 'title__button visited';
        setVisited(v);
    }
    const onMouseLeave = () => {
        const v = 'title__button';
        setVisited(v);
    }

    return (
        <div className='additional-cont' 
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
            <div className='additional-cont-title'>
                <div className={visited}> 
                    {selectedTab !== 0
                        ? <a onClick={onPrevClick}>&#8592;{prevDateLabel}</a>
                        : null} 
                </div>
                {additionalInfoTitles[type]}
                <div className={visited}>
                    {selectedTab !== 2
                        ? <a onClick={onNextClick}>{nextDateLabel}&#8594;</a>
                        : null} 
                </div>
            </div>
            <div className='additional-cont-date'>
                <span>{dateVal1}</span>
                <span>{dateVal2}</span>
            </div>
            <Times></Times>
            <ValueBoxes values={values} type={type} oneLine={oneLine}></ValueBoxes>
        </div>
    );
}