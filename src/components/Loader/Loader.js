import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import './Loader.css';

export default function Loader() {
    return (
        <div className='loader-cont'>
            <CircularProgress color='primary'></CircularProgress>
        </div>
    );
}