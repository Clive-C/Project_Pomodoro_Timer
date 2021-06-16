import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import DurationControl from "./DurationControl";
import ProgressView from "./ProgressView";
import PlayControl from "./PlayControl";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration ] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  //when the stop button is pressed, it will reset the timer to for the focus duration and break duration to 25 mins and 5 mins respectively
  const handleStop = (click) =>{
    setIsTimerRunning(false);
    setSession(null);
    setFocusDuration(1500);
    setBreakDuration(300);
  }

  return (
    <div className="pomodoro">
      
      {/*component which allows the user to set the desired time length for focus duration and break duration */}
      <DurationControl
        session={session}
        focusDuration={focusDuration}
        setFocusDuration={setFocusDuration}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
      />

      {/*component which sets and displays the action buttons*/}
      <PlayControl
        playPause={playPause}
        isTimerRunning={isTimerRunning}
        session={session}
        handleStop={handleStop}
      />
     
     {/*component which displays the status/progress of the timer */}
      <ProgressView
        session={session}          
        focusDuration={focusDuration}          
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
      />  
 
    </div>
  );
}

export default Pomodoro;
