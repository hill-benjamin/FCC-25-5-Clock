import React, { useRef, useState, useEffect } from 'react';
import './Clock.css'

const Clock = ({audioRef, minutes, seconds, counterType}) =>{
  
    useEffect(() => {
        if ((minutes === 0 || minutes === '0') && (seconds === 0 || seconds === '0')) {
            if (audioRef.current) {audioRef.current.play()};
        } 
        else {
            audioRef.current.pause();   
            audioRef.current.currentTime = 0;
        }
    }, [minutes, seconds]);
 
    return(
        <div id='clock' className={`clock ${counterType === 'Session' ? 'session-color' : 'break-color'}`}>
            <h2 id='timer-label'>{counterType}</h2>
            <div id="time-left" className={`time-left ${minutes === 0 ? 'danger' : ''}`}>
                <span>{minutes < 10 ? '0' + minutes : minutes}</span>
                :
                <span>{seconds < 10 ? '0' + seconds : seconds}</span>
            </div>

        <audio ref={audioRef} id='beep' preload='auto'>
            <source src='/alarm-clock-sound.mp3' type="audio/mpeg" />
        </audio>
        </div>
    )
}

export default Clock;