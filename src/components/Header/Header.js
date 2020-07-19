import React from 'react';

import './Header.css';

export default function Header(props) {
    return (
        <div className='header-cont'>
            <div>
                <input className='header-cont__city' 
                    type='text'
                    placeholder='City'
                    />
            </div>
        </div>
    );
}