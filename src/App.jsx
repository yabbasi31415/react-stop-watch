import "./App.css";
import { useEffect } from "react";
import {
  StopWatchContextProvider,
  useStopWatchContext,
} from "./StopWatchProvider";
import { formatTime } from "./utils";

export default function StopWatch() {
  return (
    <>
      <StopWatchContextProvider>
        <div className="main">
          <Clock />
          <Buttons />
          <LogTable />
        </div>
      </StopWatchContextProvider>
    </>
  );
}

function Buttons() {
  return (
    <div className="button-actions">
      <Button name={"start"} />
      <Button name={"split"} />
      <Button name={"reset"} />
    </div>
  );
}

function LogTable() {
  const [{ logRow, logIndex }] = useStopWatchContext();

  return (
    <>
      <div className="grid-container">
        {logRow.map((logRow, index) => (
          <>
            <div className="grid-item" key={logIndex}>
              {logRow.id}
            </div>
            <div className="grid-item" key={logRow.clock}>
              {logRow.clock}
            </div>
            <div className="grid-item" key={logRow.event + toString(logIndex)}>
              {logRow.event}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

const Button = ({ name }) => {
  const [state, dispatch] = useStopWatchContext();
  const btnEnableDisable = !state[name].isDisabled
    ? state[name].class
    : "btn-disabled";

  return (
    <button
      id={state[name].id}
      className={`btn ${btnEnableDisable}`}
      onClick={() => dispatch(state[name].id)}
      disabled={state[name].isDisabled}
    >
      {state[name].id}
    </button>
  );
};

const Clock = () => {
  const [state, dispatch] = useStopWatchContext();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch("IncrementCount");
    }, 1);
    return () => clearInterval(interval);
  }, [state, dispatch]);

  return (
    <div className="clock">
      <SetDisplay />
      <SetMiniDisplay />
    </div>
  );
};

function SetDisplay() {
  const [state] = useStopWatchContext();
  const { hrs, min, sec, ms } = formatTime(state.timeCount);

  return (
    <>
      <p>
        {hrs}:{min}:{sec}.{ms % 10}
        <span className="subscript-timer">{ms % 100}</span>
      </p>
    </>
  );
}

function SetMiniDisplay() {
  const [state] = useStopWatchContext();

  if (state.clicked === "none")
    return <p className="secondary-display">SPLIT TIME</p>;

  const { hrs, min, sec, ms } = formatTime(state.timeCount);

  return (
    <>
      <p className="secondary-display">
        {hrs}:{min}:{sec}.{ms % 1000}
      </p>
    </>
  );
}
