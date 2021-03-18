import React from "react";

export default function StopButton({ timerStats, setTimerStats, setIsTimerRunning }) {
  function handleClick() {
    setTimerStats({
      ...timerStats,
      focusTimeCurrent: timerStats.focusTimeStart * 60,
      breakTimeCurrent: timerStats.breakTimeStart * 60,
      focus: true,
      hasStarted: false,
      
    });
    setIsTimerRunning(false)
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-secondary"
      title="Stop the session"
      
    >
      <span className="oi oi-media-stop" />
    </button>
  );
}
