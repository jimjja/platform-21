import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import './Timer.less';

function getDisplayTime(time) {
  return time.toString().length === 1 ? `0${time}` : time;
}

function countdownTime(secs) {
  const hours = Math.floor(secs / (60 * 60));
  const displayHours = getDisplayTime(hours);
  const divisorMinutes = secs % (60 * 60);
  const minutes = Math.floor(divisorMinutes / 60);
  const displayMinutes = getDisplayTime(minutes);

  const divisionSeconds = divisorMinutes % 60;
  const seconds = Math.ceil(divisionSeconds);
  const displaySeconds = getDisplayTime(seconds);

  return {
    hours: displayHours,
    minutes: displayMinutes,
    seconds: displaySeconds,
  };
}

function Timer({ timeSeconds = 10, displayButtons = true }) {
  const seconds = useRef(timeSeconds);
  const [currTime, setCurrTime] = useState(countdownTime(seconds.current));
  const [isOn, setIsOn] = useState(false);
  const timer = useRef(0);

  function countDown() {
    // Remove one second, set state so a re-render happens.
    const currSeconds = seconds.current - 1;
    seconds.current = currSeconds;
    setCurrTime(countdownTime(currSeconds));

    // Check if we're at zero.
    if (seconds.current === 0) {
      clearInterval(timer.current);
      setIsOn(false);
    }
  }

  function startTimer() {
    if (!timer.current && seconds.current > 0) {
      timer.current = setInterval(countDown, 1000);
      setIsOn(true);
    }
  }

  function stopTimer() {
    clearInterval(timer.current);
    timer.current = null;
    setIsOn(false);
  }

  function resetTimer() {
    clearInterval(timer.current);
    timer.current = null;
    seconds.current = timeSeconds;
    setCurrTime(countdownTime(seconds.current));
    setIsOn(false);
  }

  return (
    <div>
      <h3 className={`timer ${isOn && 'timer--pulsing'}`}>
        {currTime.minutes}:{currTime.seconds}
      </h3>
      {displayButtons && (
        <>
          <Button type="primary" onClick={startTimer}>
            Start
          </Button>
          <Button type="danger" onClick={stopTimer}>
            Stop
          </Button>
          <Button type="ghost" onClick={resetTimer}>
            Reset
          </Button>
        </>
      )}
    </div>
  );
}

export default Timer;
