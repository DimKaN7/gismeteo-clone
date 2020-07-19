import React from 'react';

import './TempertureBox.css';

export default function TempertureBox(props) {
    const {temp, top} = props;
    const tempColors = {
        warm: '#FDEEC1',
        // ...
    };
    const styles = {
        tempBox: {
            backgroundColor: `${tempColors.warm}`,
            position: 'relative',
            top: `${top}px`,
        }
    };

    return (
        <div className='temp-box'
             style={styles.tempBox}>
            <span>{temp}</span>
        </div>
    );
}