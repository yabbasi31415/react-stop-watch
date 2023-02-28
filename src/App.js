import "./App.css";
import { useEffect, useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

const Clock = (props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      props.setTimeCount(
        (timeCount) =>
          timeCount +
          ((props.state === "Start" || props.state === "Split") && 1)
      );
      props.setTimeCount(
        (timeCount) => timeCount * (1 - (props.state === "Reset" && 1))
      );
    }, 1);
    return () => clearInterval(interval);
  }, [props]);

  return (
    <>
      <SetDisplay timeCount={props.timeCount} />
      <SetMiniDisplay state={props.state} timeCount={props.timeCount} />
    </>
  );
};

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

function startClicked(
  startButton,
  setStartButton,
  splitButton,
  setSplitButton,
  resetButton,
  setResetButton,
  setState,
  timeCount,
  log,
  setLog,
  rows,
  setRows
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
    setLog({
      index: log.index + 1,
      clock: Object.values(formatTime(timeCount)).join(":"),
      event: "Pause",
    });
    console.log('Pause event: index: ' + log.index);
    setRows([...rows, { id: log.index, clock: Object.values(formatTime(timeCount)).join(":"), event: 'Pause' }]);
  };

  startButton.id === "Start" ? setPause() : setStart();
}

function splitClicked(
  splitButton,
  setSplitButton,
  timeCount,
  log,
  setLog,
  rows,
  setRows
) {
  setLog({
    index: log.index + 1,
    clock: Object.values(formatTime(timeCount)).join(":"),
    event: "Split",
  });

  setRows([...rows, { id: log.index, clock: Object.values(formatTime(timeCount)).join(":"), event: 'Split' }]);

  console.log(
    "Log entry: " + log.index + " " + log.clock + " " + " " + log.event
  );
}

function resetClicked(resetButton, setResetButton, timeCount, log, setLog, rows, setRows) {
  console.log("Log table cleared");
  setRows({ id: 0, clock: '', event: '' },);
}

function LogTable(props) {
  const columns = [
    { key: "id", name: "" },
    { key: "clock", name: "" },
    { key: "event", name: "" },
  ];

  return <DataGrid columns={columns} rows={props.rows} />;
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

  const [timeCount, setTimeCount] = useState(0);

  const [log, setLog] = useState({
    index: 0,
    clock: "00:00:00:000",
    event: "Init",
  });

  const [rows, setRows] = useState([
    { id: 0, clock: '', event: '' },
  ]);

  

  return (
    <>

      <Clock state={state} timeCount={timeCount} setTimeCount={setTimeCount} />

      <Button
        value={startButton.id}
        classEnabled={startButton.class}
        clickHandler={() =>
          startClicked(
            startButton,
            setStartButton,
            splitButton,
            setSplitButton,
            resetButton,
            setResetButton,
            setState,
            timeCount,
            log,
            setLog,
            rows,
            setRows
          )
        }
        type={startButton.type}
        isDisabled={startButton.isDisabled}
      />

      <Button
        value={splitButton.id}
        classEnabled={splitButton.class}
        clickHandler={() => {
          splitClicked(
            splitButton,
            setSplitButton,
            timeCount,
            log,
            setLog,
            rows,
            setRows
          );
          setState("Split");
        }}
        type={splitButton.type}
        isDisabled={splitButton.isDisabled}
      />

      <Button
        value={resetButton.id}
        classEnabled={resetButton.class}
        clickHandler={() => {
          resetClicked(
            resetButton,
            setResetButton,
            timeCount,
            log,
            setLog,
            rows,
            setRows
          );
          setState("Reset");
        }}
        type={resetButton.type}
        isDisabled={resetButton.isDisabled}
      />

      <LogTable rows={rows} />
    </>
  );
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}


//context API