import React from 'react';
import classes from './LoadingScreen.module.css';

export default function LoadingScreen() {

    return (
        <div className={classes.container}>
            <div className={classes.items}>
                <img src="/loading.svg" alt="Loading!" />
                <h1>Loading...</h1>
            </div>
        </div>
    );
} 