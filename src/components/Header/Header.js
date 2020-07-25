import React, { useState } from 'react';

import './Header.css';

export default function Header(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className='header-cont'>
            <form onSubmit={(event) => {setValue(''); onSubmit(event, value)}}>
                <input className='header-cont__city' 
                       type='text'
                       placeholder='City'
                       onChange={onChange}
                       value={value} />
            </form>
        </div>
    );
}