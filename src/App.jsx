import "./App.css";
import {
  useEffect,
} from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
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
        <div className="actions">
        <Button name={"start"} />
        <Button name={"split"} />
        <Button name={"reset"} />

        </div>
        <LogTable />
        </div>
      </StopWatchContextProvider>
    </>
  );
}

function LogTable() {
  const [{logRow: rows}] = useStopWatchContext();
  const columns = [
    { key: "id", name: "" },
    { key: "clock", name: "" },
    { key: "event", name: "" },
  ];

  return <DataGrid columns={columns} rows={rows} />;
}

const Button = ({name}) => {
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
        <span>{hrs}</span>:<span>{min}</span>:<span>{sec}</span>.
        <span>{ms % 10}</span>
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
