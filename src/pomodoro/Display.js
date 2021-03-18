import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";

export default function Display({ timerStats }) {
  if (timerStats.hasStarted) {
    let progress;
    if (timerStats.focus) {
      progress = 100 - (timerStats.focusTimeCurrent / (timerStats.focusTimeStart * 60)) * 100;
    } else {
      progress = 100 - (timerStats.breakTimeCurrent / (timerStats.breakTimeStart * 60)) * 100;
    }

    return (
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            {timerStats.focus === true ? (
              <h2 data-testid="session-title">
                Focusing for {minutesToDuration(timerStats.focusTimeStart)}{" "}
                minutes
              </h2>
            ) : (
              <h2 data-testid="session-title">
                On Break for {minutesToDuration(timerStats.breakTimeStart)}{" "}
                minutes
              </h2>
            )}
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {timerStats.focus
                ? secondsToDuration(timerStats.focusTimeCurrent)
                : secondsToDuration(timerStats.breakTimeCurrent)}{" "}
              remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress} // TODO: Increase aria-valuenow as elapsed time increases
                style={{
                  width: `${progress}%`,
                }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
