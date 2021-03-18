import React from "react";


export default function Button({
  dataTestid,
  className,
  timerStats,
  setTimerStats,
  isTimerRunning,
  
}) {
  function clamp(num, min, max) {
    return num > max ? max : num < min ? min : num;
  }
  const handleClick = () => {
    let x = 0;
    if (dataTestid === "decrease-focus") {
      x = clamp(
        timerStats.focusTimeStart - timerStats.focusTimeIncrement,
        timerStats.focusTimeMin,
        timerStats.focusTimeMax
      );
      setTimerStats({ ...timerStats, focusTimeStart: x, focusTimeCurrent: x * 60});
    } else if (dataTestid === "increase-focus") {
      x = clamp(
        timerStats.focusTimeStart + timerStats.focusTimeIncrement,
        timerStats.focusTimeMin,
        timerStats.focusTimeMax
      );
      setTimerStats({ ...timerStats, focusTimeStart: x, focusTimeCurrent: x * 60});
    } else if (dataTestid === "decrease-break") {
      x = clamp(
        timerStats.breakTimeStart - timerStats.breakTimeIncrement,
        timerStats.breakTimeMin,
        timerStats.breakTimeMax
      );
      setTimerStats({ ...timerStats,  breakTimeStart: x, breakTimeCurrent: x * 60});
    } else if (dataTestid === "increase-break") {
      x = clamp(
        timerStats.breakTimeStart + timerStats.breakTimeIncrement,
        timerStats.breakTimeMin,
        timerStats.breakTimeMax
      );
      setTimerStats({ ...timerStats, breakTimeStart: x, breakTimeCurrent: x * 60 });
    }
    
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-secondary"
      data-testid={dataTestid}
      disabled={timerStats.hasStarted}
    >
      <span className={className} />
    </button>
  );
}
