import React from "react";
import {secondsToDuration} from "../utils/duration";
import {minutesToDuration} from "../utils/duration";

const DurationControl = ({session, focusDuration, setFocusDuration, breakDuration, setBreakDuration}) =>{

    //increases the focus duration time by 5 min intervals to a max of 60 mins
    const handleFocusIncrease = (click) =>{
        const newFocusDuration = focusDuration + 300;
        if (newFocusDuration >= 3600){
            setFocusDuration(3600);
        } 
        else {
            setFocusDuration(newFocusDuration);
        }
    }

    //decreases the focus duration time by 5 min intervals to a min of 5 mins
    const handleFocusDecrease = (click) =>{
        const newFocusDuration = focusDuration - 300;
        if (newFocusDuration <= 300){
            setFocusDuration(300);
        }
        else {
            setFocusDuration(newFocusDuration);
        }
    }

    //increases the break duration time in 1 min intervals to a max of 15 mins
    const handleBreakIncrease = (click) =>{
        const newBreakDuration = breakDuration + 60;
        if (newBreakDuration >= 900){
            setBreakDuration(900);
        }
        else {
            setBreakDuration(newBreakDuration);
        }
    }
    
    //decreases the break duration time in 1 min interval to a min of 1 min
    const handleBreakDecrease = (click) =>{
        const newBreakDuration = breakDuration - 60;
        if (newBreakDuration <= 60){
            setBreakDuration(60);
        }        
        else {
            setBreakDuration(newBreakDuration);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="input-group input-group-lg mb-2">
                        <span className="input-group-text" data-testid="duration-focus">
                            Focus Duration: {minutesToDuration(focusDuration/60)} {/*using minustesToDuration allows the display of 60 Minute mark*/}
                        </span>

                        <div className="input-group-append">
                            {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-testid="decrease-focus"
                                onClick={handleFocusDecrease}
                                disabled={session}
                            >
                                <span className="oi oi-minus" />
                            </button>
                                {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-testid="increase-focus"
                                onClick={handleFocusIncrease}
                                disabled={session}   
                            >
                                <span className="oi oi-plus" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="col">
                    <div className="float-right">
                        <div className="input-group input-group-lg mb-2">
                            <span className="input-group-text" data-testid="duration-break">
                                {/* TODO: Update this text to display the current break session duration */}
                                Break Duration: {secondsToDuration(breakDuration)}
                             </span>
                            <div className="input-group-append">
                                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-testid="decrease-break"
                                    onClick={handleBreakDecrease}
                                    disable={session}
                                >
                                    <span className="oi oi-minus" />
                                </button>
                                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-testid="increase-break"
                                    onClick={handleBreakIncrease}
                                    disable={session}
                                >
                                    <span className="oi oi-plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default DurationControl;