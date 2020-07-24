import React, { useState } from 'react';

import './Header.css';

export default function Header(props) {
    // const {onSubmit} = props;
    // const [value, setValue] = useState('');

    return (
        <div className='header-cont'>
            <div>
                <input className='header-cont__city' 
                       type='text'
                       placeholder='City'/>
            </div>
        </div>
    );
}