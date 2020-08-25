import React, {useState, useEffect, useRef} from 'react';
import styled, {keyframes} from 'styled-components';
import pixelWidth from 'string-pixel-width';

import './Marquee.css';

const anim = (offset) => keyframes`
    0% {transform: translateX(0px);}
    20% {transform: translateX(0px);}
    40% {transform: translate(${offset}px);}
    60% {transform: translate(${offset}px);}
    80% {transform: translate(0px);}
    100% {transform: translateX(0px);}
`
const MarqueeSpan = styled.span`
    width: 100%;
    white-space: nowrap;
    animation-name: ${props => anim(props.offset)};
    animation-duration: 6s;
    animation-iteration-count: infinite;
`

export default function Marquee(props) {
    const {string} = props;

    const [offset, setOffset] = useState(0);
    const contRef = useRef(null);

    useEffect(() => {
        if (contRef) {
            const contWidth = contRef.current.offsetWidth;
            const stringLength = pixelWidth(string, {size: 17.5});
            const o = stringLength - contWidth > 0 ? contWidth - stringLength : 0;
            setOffset(o);
        }
    }, [string]);

    return (
        <div className='marquee-cont' ref={contRef}>
            <MarqueeSpan offset={offset}>
                {string}
            </MarqueeSpan>
        </div>
    );
}