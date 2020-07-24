import React from 'react';

import './ValueBox.css';

export default function ValueBox(props) {
    const {value, top, type} = props;
    // const tempColors = {
    //     warm: '#FDEEC1',
    //     // ...
    // };
    const color = type === 'temp' ? '#FDEEC1' : 
                  type === 'pressure' ? '#F3DDF5' :
                  type === 'humidity' ? '#84C6F1' : 
                  '#F0F0F0';
    const styles = {
        valueBox: {
            backgroundColor: `${color}`,
            position: 'relative',
            top: `${top}px`,
            fontWeight: `${type === 'temp' ? '500' : '400'}`,
            fontSize:  `${type === 'temp' ? '22px' : '18px'}`,
        }
    };

    return (
        <div className='value-box'
             style={styles.valueBox}>
            <span>{value}</span>
        </div>
    );
}