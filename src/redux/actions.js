// session and length countdown
export const increment = () => ({type:'INCREMENT'});
export const decrement = () => ({type:'DECREMENT'});

// timer - countdown
export const startCountdown = () => ({type: 'START_COUNTDOWN'});
export const stopCountdown = () => ({type: 'STOP_COUNTDOWN'});
export const resetCountdown = () => ({type:'RESET_COUNTDOWN'});

/*
Stop Countdown
Start Countdown
Reset Countdown
*/