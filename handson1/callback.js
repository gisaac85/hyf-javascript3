'use strict';

function timerStopped() {
    console.log('Timer stopped');

}

function startTimer(duration, cb) {

    console.log('Timer started');
    setTimeout(cb, duration);

}

startTimer(2000, timerStopped);