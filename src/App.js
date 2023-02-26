import "./App.css";
import { useEffect, useState } from "react";

const Clock = (props) => {
  const [timeCount, setTimeCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeCount((timeCount) => timeCount + (props.state === "Start" && 1));
      setTimeCount(
        (timeCount) => timeCount * (1 - (props.state === "Reset" && 1))
      );
    }, 1);
    return () => clearInterval(interval);
  }, [props.state]);

  return (
    <>
      <SetDisplay timeCount={timeCount} />
      <SetMiniDisplay state={props.state} timeCount={timeCount} />
    </>
  );
};

/* 

const MillisecondTimer = (props) => {
  const [millisec, setMillisec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMillisec((millisec) => millisec + (props.name == "Start" && 1));
    }, 1);
    return () => clearInterval(interval);
  }, [props.name]);

  // console.log("Value: " + props.name);

  let ms = millisec % 1000;
  let sec = pad(parseInt((millisec / 100) % 60, 10));
  let min = pad(parseInt(millisec / (60 * 100), 10));
  let hrs = pad(parseInt(millisec / (3600 * 100), 10));

  return DisplayClock({millisec});

  // return (
  //   <>
  //     <p>
  //       <span>{hrs}</span>:<span>{min}</span>:<span>{sec}</span>.
  //       <span>{ms % 10}</span>
  //       <span className="subscript-timer">{ms}</span>
  //     </p>
  //   </>
  // );
};

function Buttons() {
  const [classes, setClasses] = useState({
    start: "enable-start-btn",
    split: "disable-btn",
    reset: "disable-btn",
  });

  // console.log("Init " + classes.start + " " + classes.split + " " + classes.reset);

  const [value, setValue] = useState("Start");
  const [buttonstate, setButtonstate] = useState("Init");

  function handleClick(event) {
    if (event == "Start") {
      if (value == "Start") {
        setValue("Pause");
        setButtonstate("Start");

        setClasses((classes) => ({
          start: "enable-pause-btn",
          split: "enable-split-btn",
          reset: "disable-btn",
        }));
        // console.log("OnBtn " + classes.start + " " + classes.split + " " + classes.reset);
      } else {
        setValue("Start");
        setButtonstate("Pause");
        setClasses((classes) => ({
          start: "enable-start-btn",
          split: "disable-btn",
          reset: "enable-reset-btn",
        }));
      }
    } else if (event == "Reset") {
      setValue("Start");
      setButtonstate("Reset");
      setClasses((classes) => ({
        start: "enable-start-btn",
        split: "disable-btn",
        reset: "enable-reset-btn",
      }));
    } else {
      setButtonstate("Split");
    }
  }

  return (
    <>
      <MillisecondTimer name={buttonstate} />
      <button className={classes.start} onClick={() => handleClick("Start")}>
        {value}
      </button>
      <button className={classes.split} onClick={() => handleClick("Split")}>
        Split
      </button>
      <button className={classes.reset} onClick={() => handleClick("Reset")}>
        Reset
      </button>
    </>
  );
}

*/

function formatTime(timeCount) {
  const ms = timeCount % 1000;
  const sec = pad(parseInt((timeCount / 100) % 60, 10));
  const min = pad(parseInt(timeCount / (60 * 100), 10));
  const hrs = pad(parseInt(timeCount / (3600 * 100), 10));

  return { hrs, min, sec, ms };
}

function SetDisplay(props) {
  let { hrs, min, sec, ms } = formatTime(props.timeCount);

  return (
    <>
      <p>
        <span>{hrs}</span>:<span>{min}</span>:<span>{sec}</span>.
        <span>{ms % 10}</span>
        <span className="subscript-timer">{ms % 100}</span>
      </p>
    </>
  );
}

function SetMiniDisplay(props) {
  if (props.state === "Init")
    return <p className="secondary-display">SPLIT TIME</p>;

  let { hrs, min, sec, ms } = formatTime(props.timeCount);

  return (
    <>
      <p className="secondary-display">
        {hrs}:{min}:{sec}.{ms % 1000}
      </p>
    </>
  );
}

const Button = (props) => {
  const btnEnableDisable = !props.isDisabled
    ? props.classEnabled
    : "btn-disabled";

  return (
    <button
      id={props.id}
      className={`btn ${btnEnableDisable}`}
      onClick={props.clickHandler}
      type={props.type}
      disabled={props.isDisabled}
    >
      {props.value}
    </button>
  );
};

function StartClicked(
  startButton,
  setStartButton,
  splitButton,
  setSplitButton,
  resetButton,
  setResetButton,
  setState
) {
  const setPause = () => {
    setStartButton({ ...startButton, id: "Pause", class: "enable-pause-btn" });
    setSplitButton({
      ...splitButton,
      class: "enable-split-btn",
      isDisabled: false,
    });
    setResetButton({ ...resetButton, isDisabled: true });
    setState("Start");
  };

  const setStart = () => {
    setStartButton({ ...startButton, id: "Start", class: "enable-start-btn" });
    setSplitButton({ ...splitButton, isDisabled: true });
    setResetButton({
      ...resetButton,
      class: "enable-reset-btn",
      isDisabled: false,
    });
    setState("Pause");
  };

  startButton.id === "Start" ? setPause() : setStart();
}

function SplitClicked(splitButton, setSplitButton) {
  console.log("Log table started");
}

function ResetClicked(resetButton, setResetButton) {
  console.log("Log table cleared");
}

export default function StopWatch() {
  const [state, setState] = useState("Init");

  const [startButton, setStartButton] = useState({
    id: "Start",
    class: "enable-start-btn",
    type: "button",
    isDisabled: false,
  });

  const [splitButton, setSplitButton] = useState({
    id: "Split",
    type: "button",
    isDisabled: true,
  });

  const [resetButton, setResetButton] = useState({
    id: "Reset",
    type: "button",
    isDisabled: true,
  });

  return (
    <>
      <Button
        value={startButton.id}
        classEnabled={startButton.class}
        clickHandler={() =>
          StartClicked(
            startButton,
            setStartButton,
            splitButton,
            setSplitButton,
            resetButton,
            setResetButton,
            setState
          )
        }
        type={startButton.type}
        isDisabled={startButton.isDisabled}
      />

      <Button
        value={splitButton.id}
        classEnabled={splitButton.class}
        clickHandler={() => SplitClicked(splitButton, setSplitButton)}
        type={splitButton.type}
        isDisabled={splitButton.isDisabled}
      />

      <Button
        value={resetButton.id}
        classEnabled={resetButton.class}
        clickHandler={() => {
          ResetClicked(resetButton, setResetButton);
          setState("Reset");
        }}
        type={resetButton.type}
        isDisabled={resetButton.isDisabled}
      />

      <Clock state={state} />
    </>
  );
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}
