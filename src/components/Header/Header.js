import React, {useState} from 'react';

import './Header.css';

// import data from '../../services/city.list.min.json';

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
                       placeholder='Search city'
                       onChange={onChange}
                       value={value} />
                {/* <div className='search-results'>

                </div> */}
            </form>
        </div>
    );
}