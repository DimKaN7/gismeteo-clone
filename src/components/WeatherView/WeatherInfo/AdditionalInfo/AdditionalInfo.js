import React, {useState} from 'react';
import {connect} from 'react-redux';

import './AdditionalInfo.css';

import Times from '../Times/Times';
import ValueBoxes from '../ValueBoxes/ValueBoxes';
import {setSelectedTab} from '../../../../actions/actions';

import {daysTitles, daysOfWeek, months, titles} from '../../../../services/labels';

function AdditionalInfo(props) {
    const [visited, setVisited] = useState('title__button');

    const {selectedTab, setSelectedTab,
        lang, width} = props;
    const {values, date, times, type, 
        mobile=false, oneLine=false, scroll} = props;

    const dayOfWeek = date.getUTCDay();
    const dayNum = date.getUTCDate();
    const month = date.getUTCMonth();
    const dateVal1 = lang === 'ru' 
                                ? `${daysOfWeek[lang][dayOfWeek]}, ${dayNum} ${months[lang][month]}`
                                : `${daysOfWeek[lang][dayOfWeek]}, ${months[lang][month]} ${dayNum}`;
    const dateVal2 = `, ${daysTitles[lang][selectedTab].toLowerCase()}`;
    
    const prevDate = new Date(Date.parse(date.toString()) - 86400000);
    const pDayOfWeek = prevDate.getUTCDay();
    const pDayNum = prevDate.getUTCDate();
    const pMonth = prevDate.getUTCMonth();
    const prevDateLabel = lang === 'ru'
                            ? `${daysOfWeek[lang][pDayOfWeek]}, ${pDayNum} ${months[lang][pMonth]}`
                            : `${daysOfWeek[lang][pDayOfWeek]}, ${months[lang][pMonth]} ${pDayNum}`;

    const nextDate = new Date(Date.parse(date.toString()) + 86400000);
    const nDayOfWeek = nextDate.getUTCDay();
    const nDayNum = nextDate.getUTCDate();
    const nMonth = nextDate.getUTCMonth();
    const nextDateLabel = lang === 'ru'
                            ? `${daysOfWeek[lang][nDayOfWeek]}, ${nDayNum} ${months[lang][nMonth]}`
                            : `${daysOfWeek[lang][nDayOfWeek]}, ${months[lang][nMonth]} ${nDayNum}`;

    const onMouseEnter = () => {
        const v = 'title__button visited';
        setVisited(v);
    }
    const onMouseLeave = () => {
        const v = 'title__button';
        setVisited(v);
    }
    const onPrevClick = () => {
        const newTab = selectedTab - 1;
        scroll.current.scrollLeft = 223 * newTab + 107 - (width - 20)/2;
        setSelectedTab(newTab);
    }
    const onNextClick = () => {
        const newTab = selectedTab + 1;
        scroll.current.scrollLeft = 223 * newTab + 107 - (width - 20)/2;
        setSelectedTab(newTab);
    }

    return (
        <div className='additional-cont' 
             onMouseEnter={!mobile ? onMouseEnter : null}
             onMouseLeave={!mobile ? onMouseLeave : null}>
            <div className='additional-cont-title'>
                {
                    mobile 
                    ? <div className='title__button visited'> 
                            {selectedTab !== 0
                            ? <a onClick={onPrevClick}>&#8592;</a>
                            : null} 
                        </div>
                    : <div className={visited}> 
                            {selectedTab !== 0
                            ? <a onClick={onPrevClick}>&#8592;{prevDateLabel}</a>
                            : null} 
                        </div>
                }
                {titles[lang][type]}
                {
                    mobile
                    ? <div className='title__button visited'> 
                            {selectedTab !== 2
                            ? <a onClick={onNextClick}>&#8594;</a>
                            : null} 
                        </div>
                    :   <div className={visited}>
                            {selectedTab !== 2
                            ? <a onClick={onNextClick}>{nextDateLabel}&#8594;</a>
                            : null} 
                        </div>
                }
            </div>
            <div className='additional-cont-date'>
                <span>{dateVal1}</span>
                <span>{dateVal2}</span>
            </div>
            <div className='additional-cont-wrapper'>
                <div className='wrapper-scroll'>
                    <Times times={times}></Times>
                    <ValueBoxes values={values} type={type} oneLine={oneLine}></ValueBoxes>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({selectedTab, lang, width}) => {
    return {
        selectedTab, lang, width,
    }
}

const mapDispatchToProps = {
    setSelectedTab,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo);