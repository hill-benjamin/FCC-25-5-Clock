import './App.css';
import Clock from './components/Clock';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, startCountdown, stopCountdown, resetCountdown } from './redux/actions';
import { breakBackgrounds, workBackgrounds } from './assets/data/backgrounds';

function App() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const breakCounter = useSelector((state) => state.breakTimeReducer.count);
  const sessionCounter = useSelector((state) => state.sessionTimeReducer.count); 

  const isRunning = useSelector((state) => state.countdownReducer.isRunning);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isSessionCounter, setIsSessionCounter] = useState(true)
  const [counterType, setCounterType] = useState('Session');

  useEffect(()=>{
    isSessionCounter ? setCounterType('Session') : setCounterType('Break');

    let interval;
    if(isRunning){
      interval = setInterval(()=>{
        if(seconds === 0 && minutes === 0){
          stopCountdown();
          clearInterval(interval);
      
          setTimeout(() => {
            isSessionCounter ? setMinutes(breakCounter) : setMinutes(sessionCounter);
            startCountdown()
          } ,3000);

          isSessionCounter ? setIsSessionCounter(false) : setIsSessionCounter(true);
        }
        else if(seconds === 0 && minutes > 0){
          setSeconds(59);
          setMinutes(minutes - 1)
         }
       else{
          setSeconds(seconds - 1)
        }
      },1000);
    }

    return () => {
      clearInterval(interval);
    };
  },[isRunning, seconds, minutes, sessionCounter, breakCounter]);

  useEffect(()=>{
    if(isSessionCounter){
      setMinutes(sessionCounter) 
      setSeconds(0)
    };
  },[sessionCounter])

  useEffect(()=>{
    if(!isSessionCounter){
      setMinutes(breakCounter)
      setSeconds(0)
    };
  },[breakCounter])

  const [workBackgroundIndex, setWorkBackgroundIndex] = useState(0);
  const [breakBackgroundIndex, setBreakBackgroundIndex] = useState(0);

  const changeWorkBackground = () => setWorkBackgroundIndex((state)=>(state + 1) % workBackgrounds.length);
  const changeBreakBackground = () => setBreakBackgroundIndex((state)=>(state + 1) % breakBackgrounds.length);

  useEffect(()=>{
    let backgroundInterval

    if(counterType === 'Session'){
      backgroundInterval = setInterval(()=>{
        changeWorkBackground()
      },10000)
    } 
    else if(counterType === 'Break'){
      backgroundInterval = setInterval(()=>{
        changeBreakBackground()
      },10000)
    }
  
    return () => {
      clearInterval(backgroundInterval);
    }
  },[counterType])

  return (
    <div className="App">
      <div className='background-container'>
        {counterType === 'Session' 
        ? workBackgrounds.map((item,index)=>(
            <div 
              key={index}
              className={`background-image ${index === workBackgroundIndex ? 'active' : ''}`} 
              style={{
                backgroundImage:`url(${item})`,
                opacity:`${minutes === 0 && seconds === 0 && counterType === 'Session' ? 0 : ''}`
              }}
            />
          ))
        : breakBackgrounds.map((item,index)=>(
            <div 
              key={index}
              className={`background-image ${index === breakBackgroundIndex ? 'active' : ''}`} 
              style={{
                backgroundImage:`url(${item})`,
                opacity:`${minutes === 0 && seconds === 0 && counterType === 'Break' ? 0 : ''}`
              }}
            />
          ))
        }
        
        
      </div> 
      <h1 className='text-shadow'>25 + 5 Clock</h1> 
      <div className="container-100">
        <div className='break-length' id='break-label' onLoad={'5'}>
          <h3 className='text-shadow'><span className='break-color'>Break</span> Length</h3>
          <span className="counter-container">
            <button id='break-decrement' onClick={() => isRunning ? '' :  dispatch({...decrement(), id:'breakTime'})}><i className="fa-solid fa-arrow-down text-shadow"></i></button>
              <p className='text-shadow' id='break-length'>{breakCounter}</p>
            <button id='break-increment' onClick={() => isRunning ? '' :  dispatch({...increment(), id:'breakTime'})}><i className="fa-solid fa-arrow-up text-shadow"></i></button>
          </span>
        </div>

        <div className='session-length text-shadow' id='session-label'>
          <h3 className='text-shadow'><span className='session-color'>Session</span> Length</h3>
          <span className="counter-container text-shadow">
            <button id='session-decrement' onClick={() => isRunning ? '' : dispatch({...decrement(), id:'sessionTime'})}><i className="fa-solid fa-arrow-down text-shadow"></i></button>
              <p id='session-length' className='text-shadow'>{sessionCounter}</p>
            <button id='session-increment' onClick={() => isRunning ? '' :  dispatch({...increment(), id:'sessionTime'})}><i className="fa-solid fa-arrow-up text-shadow"></i></button>
          </span>
        </div>
      </div>

      <Clock audioRef={audioRef} minutes={minutes} seconds={seconds} counterType={counterType}/>

      <div className="control-time-btn">
        <button className="playpause-btn" id='start_stop' onClick={() => dispatch(isRunning ? stopCountdown() : startCountdown())}><i className="fa-solid fa-play"></i><i className="fa-solid fa-pause"></i></button>
        <button className="restart-btn text-shadow" id='reset' onClick={()=> { 
          dispatch({...resetCountdown(), id:'breakTime'});
          dispatch({...resetCountdown(), id:'sessionTime'});
          setMinutes(25);
          setSeconds(0);
          setCounterType('Session');
          setIsSessionCounter(true);
          audioRef.current.pause();   
          audioRef.current.currentTime = 0;
        }}><i className="fa-solid fa-arrows-rotate"></i></button>
      </div>   

      <p className='final-words text-shadow'>Chill, Work & Organize</p>
    </div>
  );
}



export default App;
