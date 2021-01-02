// This code is raw, not refactored, because my main purposes for doing this FCC Challenge, as well as the other FCC challenges, are to try to figure out how to write the code on my own without having to look at and read the documentation and etc. But after trying things, whether I'm successful or not, then I look at the document, especially if I get super stuck.

const { useState, useEffect, useLayoutEffect } = React;
// const beep = document.getElementById("beep");

// Components
function PomodoroClock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session Timer");

  // const [sessionTimer, setSessionTimer] = useState({minutes: sessionLength, seconds: "00"});
  // const [timer, setTimer] = useState({minutes: sessionLength, seconds: "00"});
  const [breakTimer, setBreakTimer] = useState({minutes: breakLength, seconds: 0});
  const [sessionTimer, setSessionTimer] = useState({minutes: sessionLength, seconds: 0});
  const [startStop, setStartStop] = useState(null);
  // const [intervalID, setIntervalID] = useState("");
  
  // Note: I switched from useEffect to useLayoutEffect after modifying/finishing minuteOrLessSignal function because I saw something weird happening when the session timer was 1 minute and the break timer was at 2 minutes during 250ms coutdown speed (the countdown would blink white and then go red when switching the countdown from the break timer to the session timer). After trying some things, I couldn't stop it so I looked up the documentation and found out that for visual DOM mutations, it's better to use useLayoutEffect because it fires synchronously before the DOM is painted, displayed. Yeehaw! 
  
  // useEffect(
  useLayoutEffect (
    function prepend0 () {
      // const {minutes: m, seconds: s} = sessionTimer;
      // const {minutes: min, seconds: sec} = breakTimer;
      if (sessionTimer.minutes <= 9) {
        setSessionTimer(
          prev => ({minutes: "0" + prev.minutes, seconds: prev.seconds})
        );
      }
      
      if(sessionTimer.seconds <= 9) {
        setSessionTimer(
          prev => ({minutes: prev.minutes, seconds: "0" + prev.seconds})
        );
      }
      
      if(breakTimer.minutes <= 9) {
        setBreakTimer(
          prev => ({minutes: "0" + prev.minutes, seconds: prev.seconds})
        );
      }
      
      if(breakTimer.seconds <= 9) {
        setBreakTimer(
          prev => ({minutes: prev.minutes, seconds: "0" + prev.seconds})
        );
      }
    }, [] // sense my only dependencies are the sesssionTimer and breakTimer object's, if I understand the documentation correctly, since they are state, which is guaranteed to be stable, I don't have to put them in the dependency list
    // The Empty Array should only make the useEffect run once and only run again if a state or some other supplied dependency changes 
  );   
 
  // useEffect(
  useLayoutEffect(
    function alternatingCountdowns () {
      // if (sessionTimer.minutes === 0) setStartStop("Stop");
      const SessionLength = sessionLength;
      // console.log("SessionLength", SessionLength);
      if (startStop === "Started") {
        // var mainInterval = setTimeout(
        //   () => {
        
        // The two if statements for prepending "0" were initally within the setInterval function, but 
        // I copied and pasted them here and added an extra condition to prevent the prependation of "0" to a string that already has "0" at index 0. So far both if statements seem to be working fine. But then when I wrote the prepend "0" statements for breakTimer, I realized that all four of the if statements were going to be checked everytime startStop === "Start" and that it may be better to nest the if statements within the timerLabel if conditions but outside the setInterval functions so that they only run with their respective timer, timerLabel
        
        
       /*
       */
        
        if (timerLabel === "Session Timer") {
          // Where's the best place to put the prepend "0" if statements?
//           if (sessionTimer.minutes <= 9 && sessionTimer.minutes[0] !== "0") {
//             setSessionTimer(
//               prev =>({minutes: "0" + prev.minutes, seconds: prev.seconds}));
//             }

//           if(sessionTimer.seconds <= 9 && sessionTimer.seconds[0] !== "0") {
//             setSessionTimer(
//               prev => ({minutes: prev.minutes, seconds: "0" + prev.seconds}));
//           }      
          const sessionInterval = setTimeout(
            () => {
                  
              // setSessionTimer(prev => ({minutes: prev.minutes - 1, seconds: "00"}));
              if(sessionTimer.minutes > 0 && sessionTimer.seconds == 0) { 
              // equality will try to convert both operands to numbers, 
              // if strict equality is used, you have to prepend a + to sessionTimer.seconds or use Number(sessionTimer.seconds);
                
                setSessionTimer(
                  prev => {
                    if (prev.minutes - 1 <= 9) {
                      // I think I figured it out. The other if statments such as prev.minutes <= 9 or prev.minutes < 10 were causing it to skip 9 because when the prev.minutes was 10 the current minute/number was 10 and wouldn't prepend "0" but then minute was updated to 9 by prev.minutes - 1 which caused it to skip 9, but after that, the prev.minutes is 9 and  and the minutes is updated to 8 by prev.minutes - 1 and since that is less than 9, "0" is prepended to it and so forth for the rest of the numbers below 8. At least I think that is what's going on. ??? 
                      return ({minutes: "0" + (prev.minutes - 1), seconds: 59});
                    }
                    else {
                      return ({minutes: prev.minutes - 1, seconds: 59});
                    }
                  }
                );
                // prepend "0" if minutes less than equal to 9
                // if (sessionTimer.minutes <= 9) { // when I set the intial time above 10, this did not prepend "0" to 9 either but to 8 and below. ??? So I tried <= 10 and it worked:
                // if(sessionTimer.minutes <= 10) {
                // setSessionTimer(
                //   prev =>({minutes: "0" + prev.minutes, seconds: prev.seconds}));
                // }
              }
                  
              if (sessionTimer.seconds > 0) {
                    // if(prev.seconds - 1 <= 9) {
                    //   return {minutes: prev.minutes, seconds: "0" + (prev.seconds - 1)}
                    // }
                setSessionTimer(
                  prev => {
                    // if(prev.seconds <= 10) { // this works to prepend "0" to seconds <= 9
                    //   return {minutes: prev.minutes, seconds: "0" + (prev.seconds - 1)}
                    // }
                    if (prev.seconds - 1 <= 9) {
                      return {minutes: prev.minutes, seconds: "0" + (prev.seconds - 1)};
                    }
                    else {
                      return {minutes: prev.minutes, seconds: prev.seconds - 1};
                    }
                  }
                ); // closing curly bracket for if statment is below the commented out code just below.
                // if (sessionTimer.seconds - 1 <= 9 && sessionTimer.seconds[0] !== "0") {
                //   setSessionTimer(prev => ({minutes: prev.minutes, seconds: "0" + prev.seconds}));
                // }
               
                // This if statement below, for prepending a "0", doesn't prepend a zero to 9 for some reason. ????
                // So I moved it into the setSessionTimer function and it still wouldn't work
                // so I subtract 1 from sessionTimer.seconds and then it worked withing setSessionTimer and outside here:
                // if(sessionTimer.seconds - 1 <= 9 ) {
                //   setSessionTimer(
                //     prev => ({minutes: prev.minutes, seconds: "0" + prev.seconds})
                //   );
                // }
              }
              // The if statement above works here to, but another condition is needed because the sessionTimer starts out with "00"
              // if(sessionTimer.seconds - 1 <= 9 && sessionTimer.seconds !== "00" ) {
              //     setSessionTimer(
              //       prev => ({minutes: prev.minutes, seconds: "0" + prev.seconds})
              //     );
              //   }
              if (sessionTimer.minutes == 0 && sessionTimer.seconds == 0) {
                // beep.play();
                setSessionTimer(prev => ({minutes: sessionLength, seconds: "00"}));
                
                console.log("Session Timer Error Point", sessionTimer.minutes, sessionTimer.seconds, sessionLength, SessionLength, {minutes: 1, seconds: "00"});
                
                setTimerLabel("Break Timer");
              }
            }, 1000 // 1000 250
          );
               return () => {clearTimeout(sessionInterval)};
        } // end of if (timerLabel === "Session Timer")
        
        if (timerLabel === "Break Timer") {
//           when ready, resume here... write the prepend "0" if statements for the breakTimer here. And the write the code for making the interval breakTimer work
          const breakInterval = setTimeout(
            () => {
              // if(breakTimer.minutes <= 9) {
              //   setBreakTimer()
              // }
              // setBreakTimer(prev => ({minutes: prev.minutes - 1, seconds: "00"}));
              
              if (breakTimer.minutes > 0 && breakTimer.seconds == 0) {
                setBreakTimer(
                  prev => {
                    if(prev.minutes - 1 <= 9) {
                      return {minutes: "0" + (prev.minutes - 1), seconds: 59};
                    }
                    else {
                      return {minutes: prev.minutes - 1, seconds: 59};
                    }
                  }
                );
              }
              
              if (breakTimer.seconds > 0) {
                setBreakTimer(
                  prev => {
                    if (prev.seconds - 1 <= 9) {
                      return {minutes: prev.minutes, seconds: "0" + (prev.seconds - 1)};
                    }
                    else {
                      return {minutes: prev.minutes, seconds: prev.seconds -1};
                    }
                  }
                );
              }
             
              if(breakTimer.minutes == 0 && breakTimer.seconds == 0) {
                // beep.play();
                setBreakTimer({minutes: breakLength, seconds: "00"});
                
                console.log("Break Timer Error Point", breakTimer.minutes, breakTimer.seconds, breakLength, {minutes: breakLength, seconds: "00"});
                
                setTimerLabel("Session Timer");
                // setSessionTimer({minutes: sessionLength, seconds: 0});
                // This line below adds a 0 before 1:00 to pass the 15th test:
                if (sessionTimer.minutes <= 9 && sessionTimer.minutes[0] !== "0") {setSessionTimer(prev => ({minutes: "0" + prev.minutes, seconds: "00"}))}
                }
              }, 1000 // 1000 250
          );
          return () => {clearTimeout(breakInterval)};
        } // end of if (timerLabel === "Break Timer")
            // return () => {clearTimer(mainInterval)};
        //   }
        // );
      } // end of if (startStop === "Start")
    } // end of function countdownEffect ()
  ); // end of countdown useEffect
  
  
  // useEffect(
  useLayoutEffect(
    function minuteOrLessSignal () {
      if (startStop === null  || startStop === "Stopped") return;
   
      if ( (// timerLabel === "Session Timer" &&
          sessionTimer.minutes <= 1 
          && sessionTimer.seconds == 0) 
          || (// timerLabel === "Break Timer" &&
          breakTimer.minutes <= 1 
          && breakTimer.seconds == 0) 
          // || breakLength == 2 && (sessionTimer.minutes == 1 && sessionTimer.seconds == 0)
          // || sessionLength == 2 && (breakTimer.minutes == 1 && breakTimer.seconds == 0)
         ) {
        timeLeftElement.style.color = "red";
        timeLeftElement.style.textShadow = "0px 1px 1px black, 0px -1px 1px black,1px 0px 1px black,-1px 0px 1px black";
      // timeLeftElement.setAttribute("style", "color: red");
        // return() => {timeLeftElement.style.color = "white"};
      }

      // else {
      //   timeLeftElement.style.color = "white";
      // }
      // if (sessionTimer.minutes > 1 && breakTimer.minutes < breakLength) {
      //   timeLeftElement.style.color = "white";
      // }
      
      if (timerLabel === "Break Timer" && ((breakTimer.minutes == 1 && breakTimer.seconds > 0) || (breakTimer.minutes > 1 && breakTimer.seconds >= 0))
         || timerLabel === "Session Timer" && ((sessionTimer.minutes == 1 && sessionTimer.seconds > 0) || (sessionTimer.minutes > 1 && breakTimer.seconds >= 0))) {
        timeLeftElement.style.color = "rgb(255, 255, 255)";
        timeLeftElement.style.textShadow = "none";
      }
     
    }
  );
 

// useEffect(
  useLayoutEffect(
  function beepAlarm () {
    // const beep1 = document.getElementById("beep");
    if (
      (sessionTimer.minutes == 0 && sessionTimer.seconds == 0) ||
      (breakTimer.minutes == 0 && breakTimer.seconds == 0)) {
      // var playPromise = beep.play();
      beep.play();
    }
    
    // if (
    //   (sessionTimer.minutes != 0 
    //   || sessionTimer.seconds !== 0) 
    //   && audio.currentTime != 0)
    //   audioElement.currentTime != 0 {
    //     audioElement.currenTime = 0;
    // }
  }
);  
 
// When ready, resume here. test to see if the global variable var is being hosted so that it can be used here. I think doing this would prevent this useEffect from having to run document.getElementById("beep") to retrieve the audio element every time. 
 // const beep = document.getElementById("beep");
 // setTimeout(() => {beep.play();}, 4000);
var beep = document.querySelector("#beep"); // here it get hosted
var timeLeftElement = document.getElementById("time-left");  
  // document.body.style.backgroundColor = "red";
 
  const handleDecrement = e => {
    if(startStop === "Started" || startStop === "Stopped") return;
    
    const id = e.target.id;
    
    // if (id === "break-decrement" && breakLength <= 0 || id === "session-decrement" && sessionLength <= 0) return;
    
    // id === "break-decrement" && setBreakLength(breakLength - 1); 
    // id === "session-decrement" && setSessionLength(sessionLength - 1);
    // if (id === "break-decrement") { 
    //   breakLength <= 0 ? null : setBreakLength(breakLength - 1);
    // }
    
    if (id === "break-decrement" && breakLength > 1) {
      setBreakLength(prevBreakLength => prevBreakLength - 1);
      if (breakLength - 1 <= 9) {
        setBreakTimer({minutes: "0" + (breakLength - 1), seconds: "00"});
      }
      else {
        setBreakTimer({minutes: breakLength - 1, seconds: "00"});
      }
    }
    
    // if (id === "session-decrement") {
    //   sessionLength <= 0 ? null : setSessionLength(sessionLength - 1); 
    // }
//     }
    
    if (id === "session-decrement" && sessionLength > 1) {
      setSessionLength(prevSessionLength => --prevSessionLength);
      if (sessionLength - 1 <= 9) {
        setSessionTimer({minutes: "0" + (sessionLength - 1), seconds: "00"});
      }
      else {
        setSessionTimer({minutes: sessionLength - 1, seconds: "00"});
      }
      // if (sessionLength - 1 <= 9) {
      //   setTimer({minutes: "0" + (sessionLength - 1), seconds: "00"})
      // }
      // else {
      //   setTimer({minutes: sessionLength - 1, seconds: "00"});
      // };
    }
      // setSessionTimer({minutes: sessionLength - 1, seconds: "00"});
    
  //   if (id === "session-decrement" && sessionTimer.minutes > 1) {
  //   setSessionTimer({minutes: sessionTimer.minutes - 1, seconds: 0});
  // }
}  
  const handleIncrement = e => {
    if (startStop === "Started" || startStop === "Stopped") return;
    
    const id = e.target.id;
    
    // if (id === "break-increment" && breakLength >= 60 || id === "session-increment" && sessionLength >= 60) return;
    
    // id === "break-increment" && setBreakLength(breakLength + 1);
    // id === "session-increment" && setBreakLength(sessionLength + 1);
    // if (id === "break-increment") {
    //   breakLength >= 60 ? null : setBreakLength(breakLength + 1);
    // }
    
    if (id === "break-increment" && breakLength < 60) {
      setBreakLength(prevBreakLength => prevBreakLength + 1);
      if (breakLength + 1 <= 9) {
        setBreakTimer({minutes: "0" + (breakLength + 1), seconds: "00"});
      }
      else {
        setBreakTimer({minutes: breakLength + 1, seconds: "00"});
      }
    }
    
   // if (id === "session-increment") { 
   //    sessionLength >= 60 ? null : setSessionLength(sessionLength + 1);
   // }
    
    if (id === "session-increment" && sessionLength < 60) {
      setSessionLength(prevSessionLength => prevSessionLength + 1);
      // setTimer({minutes: sessionLength + 1, seconds: "00"});
      if (sessionLength + 1 <= 9) {
        setSessionTimer({minutes: "0" + (sessionLength + 1), seconds: "00"});
      }
      else {
        setSessionTimer({minutes: sessionLength + 1, seconds: "00"});
      }
      // if (sessionLength + 1 <= 9 ) {
      //   setTimer({minutes: "0" + (sessionLength + 1), seconds: "00"})
      // } // resume here when ready, work on countdown timer
      // else {
      //   setTimer({minutes: sessionLength + 1, seconds: "00"});
      // };
      // setSessionTimer({minutes: sessionLength + 1, seconds: "00"});
    }
    
    // if (id === "session-increment" && sessionTimer.minutes < 60) {
    //   setSessionTimer({minutes: sessionTimer.minutes + 1, seconds: 0});
    // }
   
  }
  
  
// I wanted to combine the decrement and increment functionality together but it was causing me to write more complex code in the function so I commented it out. Plus, keeping the decrement and increment separate seems to make the code more readible, and understandable. And Separating the functionality will prevent the function to have to check more if statements.
//   const handleDecrementIncrement = (e) => {
//     const id = e.target.id;
    
//     if (id === "break-decrement" && breakLength <= 0 || breakLength >= 60) return;
//     id === "break-decrement" && setBreakLength(breakLength - 1);
//     id === "break-increment" && setBreakLength(breakLength + 1);
    
//     if (id === "session-decrement" && sessionLength <= 0 || sessionLength >= 60) return;
//     id === "session-decrement" && setSessionLength(sessionLength - 1);
//     id === "session-increment" && setSessionLength(sessionLength + 1);
//   }
  // const handleCountDown = (minutes, seconds) => {
  //   if
  // }
  
  // const handleTimers = () => {
    const showOtherTimer = () => {
      if(startStop === "Started" || startStop === "Stopped") return;
    // timerLabel === "Session Timer" ? 
    //   setTimerLabel("Break Timer") : 
    //   setTimerLabel("Session Timer");
    // if (timerLabel === "Session Timer") {
    //   if(timer.minutes < sessionLength || timer.seconds > 0)
    // }
    if (timerLabel !== "Break Timer") {
      setTimerLabel("Break Timer");
      // if (breakLength <= 9) {
      //   // I had to add this if statement since the FCC challenge requires the initialized state of breakLength to be 5 and the timer to always be in mm:ss format
      //   setBreakTimer({minutes: "0" + breakLength, seconds: "00"});
      // }
      // else {
      //   setBreakTimer({minutes: breakLength, seconds: "00"});
      // };
    }
    else {
      setTimerLabel("Session Timer");
        // if (sessionLength <= 9) {
        //   setSessionTimer({minutes: "0" + sessionLength, seconds: "00"})
        // }
        // else {
        //   setSessionTimer({minutes: sessionLength, seconds: "00"});
        // };
    }
  }
 
  // const handleCountdowns = (e) => {
  const startStopCountdown = (e) => {
    const element = e.target;
    
    // element.innerText = 
    //   (element.id === "start_stop" && 
    //  element.innerText === "Start") ?
    //  "Stop" : "Start";
  
    if (startStop === "Started") {
      setStartStop("Stopped");
      // element.innerText = "Start";
      // I'm going to just handle this side effect in the react element so that this function is only doing one thing... starting and stopping the timer. 
    }
    else {
      setStartStop("Started");
      // element.innerText = "Stop";
      // I'm going to just handle this side effect in the react element so that this function is only doing one thing... starting and stopping the timer. 
    }
    
    // if (element.innerText === "Start") {
    //   element.innerText = "Stop";
    // }
    //     else {
    //   element.innerText = "Start";
    // }
    // sessionCountdown(element);
    
  }
  
  function resetAll () {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session Timer");
    setBreakTimer({minutes: "05", seconds: "00"});
    setSessionTimer({minutes: 25, seconds: "00"});
    setStartStop(null);
    beep.pause();
    beep.currentTime = 0;
    // beep.load();
    
    timeLeftElement.style.color = "rgb(255, 255, 255)";
    timeLeftElement.style.textShadow = "none";
  }
    
  return (
    <>
      <h1>Pomodoro Clock</h1>
      <div id="break-and-session-control-container">
        <BreakLengthControl 
          breakLength={breakLength}
          // handleDecrementIncrement={handleDecrementIncrement}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          />
        <SessionLengthControl 
          sessionLength={sessionLength}
          // sessionLength={sessionTimer.minutes}
          // handleDecrementIncrement={handleDecrementIncrement}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          />
      </div>
      <BreakAndSessionTimer 
        // sessionTimer={sessionTimer}
        // timer={timer}
        breakTimer={breakTimer}
        sessionTimer={sessionTimer}
        timerLabel={timerLabel}
        startStop={startStop}
        // handleTimers={handleTimers}
        showOtherTimer={showOtherTimer}
        // handleCountdowns={handleCountdowns}
        startStopCountdown={startStopCountdown}
        // useCountdown={useCountdown}
        resetAll={resetAll}
        />
    </>
  );
}

function BreakLengthControl(props) {
  return (
    <section id="break-label">
      <h2>Break Length</h2>
      <p>
        <button 
          id="break-decrement" 
          class="downward-arrow"
          // onClick={props.handleDecrementIncrement}
          onClick={props.handleDecrement}
          >
          {/*&#10132;*/}&#10140;
        </button>
        <span 
          id="break-length"
          class="break-length">
          {props.breakLength}
        </span>
        <button 
          id="break-increment" 
          class="upward-arrow"
          // onClick={props.handleDecrementIncrement}
          onClick={props.handleIncrement}
          >
          {/*&#10132;*/}&#10140;
        </button>
      </p>
    </section>
  );
}

function SessionLengthControl(props) {
  
  return (
    <section id="session-label">
      <h2>Session Length</h2>
      <p>
        <button 
          id="session-decrement" 
          class="downward-arrow"
          // onClick={props.handleDecrementIncrement}
          onClick={props.handleDecrement}
          >
          {/*&#10132;*/}&#10140;
        </button>
        <span
          id="session-length"
          class="session-length">
          {props.sessionLength}
        </span>
        <button
          id="session-increment" 
          class="upward-arrow"
          // onClick={props.handleDecrementIncrement}
          onClick={props.handleIncrement}
          >
          {/*&#10132;*/}&#10140;
        </button>
      </p>
    </section>
  );
}

function BreakAndSessionTimer(props) {
  // const [timer, setTimer] = useState(
  //   {
  //     name: "Session Timer", 
  //     minutes: props.sessionTimer.minutes,
  //     seconds: props.sessionTimer.seconds
  //   }
  // );
  // const beep = document.getElementById("beep");
  
  // useLayoutEffect(
  //   function beepAlarm() {
  //     if (props.sessionTimer.minutes == 0 && props.sessionTimer.seconds == 0) {
  //       document.getElementById("beep").play();
  //     }
  //   }
  // );
  
    return (
    <section 
      id="timer-label">
      <h2>
        {
          // Session Timer
          // timer.name
          props.timerLabel
        }
      </h2>{/* Maybe switch to Break Time when break time starts*/}
      <p 
        id="time-left">
          {
            // props.timerLabel === "Session Timer" ? `${props.timer.minutes}:${props.timer.seconds}` : "Resume here when you're ready"
            // `${props.timer.minutes}:${props.timer.seconds}`
         props.timerLabel === "Session Timer" ? 
          `${
         /*(props.sessionTimer.minutes[0] != "0" && props.sessionTimer.minutes <= 9) ? 
           "0" + props.sessionTimer.minutes : */
         props.sessionTimer.minutes
        }:${props.sessionTimer.seconds}` :
          `${props.breakTimer.minutes}:${props.breakTimer.seconds}`
        
          }
      </p>
      <p 
        id="timer-controls">
        <button 
          id="start_stop"
          onClick={props.startStopCountdown}>
          {props.startStop === null ? "Start" : props.startStop === "Started" ? "Started" : "Stopped"}
          {/* &#9654; Play Button, HTML Symbols, Geometric Shapes, BLACK RIGHT-POINTING TRIANGLE*/}
          {/*props.startStop === 
"Stop" ? "Start" : "Stop"*/}
        </button>
        <button
          id="reset"
          onClick={props.resetAll}>
          Reset
        </button>
        <button
          id="timer-label-switch"
         // onClick={props.handleTimers}
          onClick={props.showOtherTimer}
          // onClick={props.handleTimer}
          >
          {
            // props.timerLabel === "Session Timer" ?
            //    "View: Break Timer" :
            //    "View: Session Timer"
            // TYG!YAAGA!
            
              // `View: ${
              // props.timerLabel === "Session Timer" ?
              //   "Break Timer" : "Session Timer"
              // }`
            
            // props.startStop === "Stopped" && props.timerLabel === "Session Timer" ? "View: Break Timer" : "View: Session Timer"
            
            props.startStop === "Started" ? 
              // <span>Timer Is Running &#8200;&#128522;</span> : 
              "Timer Is Running" : 
            props.startStop === "Stopped" ?
              "Timer Stopped" :
            props.timerLabel === "Session Timer" ? 
              "View Break Timer" : 
            "View Session Timer"
            /*&#128522; smiley face*/
            // &#8200; Punctuation Space
          }
        </button>
        {/*<span style={{display: "block"}}>&#128522;</span>*/}
      </p>
      {props.startStop === "Started" && <p>&#128522;</p>}
       <audio
         id="beep"
         preload="auto"         
       src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
         >Sorry, but your browser does not support HTML5 audio elements.</audio>
        {
          // <button onClick={() => {beep.play();}}>Play Audio</button>
        }
    </section>
      /*Resume here when you're ready.*/
  );
}


ReactDOM.render(
  <PomodoroClock />, 
  document.getElementById("react-js-root")
)

// Testing or possible helper functions: 
// function beepAlarm() {
//   const beep = document.getElementById("beep");
//   beep.play();
// }


// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 

