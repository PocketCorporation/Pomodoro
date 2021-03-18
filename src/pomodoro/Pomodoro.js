import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import Button from "./Button";
import StopButton from "./StopButton";
import Display from "./Display";

function Pomodoro() {
  const [timerStats, setTimerStats] = useState({
    focusTimeStart: 25,
    focusTimeMax: 60,
    focusTimeMin: 5,
    focusTimeIncrement: 5,
    focusTimeCurrent: 25 * 60,
    breakTimeStart: 5,
    breakTimeMax: 15,
    breakTimeMin: 1,
    breakTimeIncrement: 1,
    breakTimeCurrent: 5 * 60,
    focus: true,
    hasStarted: false,
  });

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useInterval(
    () => {
      if (timerStats.focusTimeCurrent === 0) {
        setTimerStats({
          ...timerStats,
          focus: false,
          focusTimeCurrent: timerStats.focusTimeStart * 60,
        });
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      } else if (timerStats.breakTimeCurrent === 0) {
        setTimerStats({
          ...timerStats,
          focus: true,
          breakTimeCurrent: timerStats.breakTimeStart * 60,
        });
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      } else if (timerStats.focus === true) {
        // setTimerStats({...timerStats, timer: timerStats.timer - 1
        setTimerStats({
          ...timerStats,
          focusTimeCurrent: timerStats.focusTimeCurrent - 1,
        });
      } else if (timerStats.focus === false) {
        setTimerStats({
          ...timerStats,
          breakTimeCurrent: timerStats.breakTimeCurrent - 1,
        });
      }
      console.log(timerStats.focusTimeCurrent, timerStats.BreakTimeCurrent)
      // ToDo: Implement what should happen when the timer is running
      // set focus/break to true/false
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    // make an conditional statement that will change has started to true only if has started is false
    if (!timerStats.hasStarted)
      setTimerStats({ ...timerStats, hasStarted: true });
    setIsTimerRunning((prevState) => !prevState);
  }
  

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(timerStats.focusTimeStart)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <Button
                dataTestid="decrease-focus"
                className="oi oi-minus"
                timerStats={timerStats}
                setTimerStats={setTimerStats}
                isTimerRunning={isTimerRunning}
              />

              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <Button
                dataTestid="increase-focus"
                className="oi oi-plus"
                timerStats={timerStats}
                setTimerStats={setTimerStats}
                isTimerRunning={isTimerRunning}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(timerStats.breakTimeStart)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <Button
                  dataTestid="decrease-break"
                  className="oi oi-minus"
                  timerStats={timerStats}
                  setTimerStats={setTimerStats}
                  isTimerRunning={isTimerRunning}
                />

                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <Button
                  dataTestid="increase-break"
                  className="oi oi-plus"
                  timerStats={timerStats}
                  setTimerStats={setTimerStats}
                  isTimerRunning={isTimerRunning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <StopButton
              timerStats={timerStats}
              setTimerStats={setTimerStats}
              setIsTimerRunning={setIsTimerRunning}
            />
          </div>
        </div>
      </div>
      <Display
        timerStats={timerStats}
        setTimerStats={setTimerStats}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
}

export default Pomodoro;
