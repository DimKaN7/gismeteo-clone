import React from 'react';

import './Header.css';

export default function Header(props) {
    return (
        <div className='header-main-container'>
            <div>
                <input className='header-main-container__city' 
                    type='text'
                    placeholder='City'
                    />
            </div>
        </div>
    );
}