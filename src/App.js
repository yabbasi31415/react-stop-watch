import "./App.css";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const defaultState = {
    clicked: "none",
    timeCount: 0,
    start: {
      id: "Start",
      class: "enable-start-btn",
      isDisabled: false,
    },
    split: {
      id: "Split",
      class: "enable-split-btn",
      isDisabled: true,
    },
    reset: {
      id: "Reset",
      class: "enable-reset-btn",
      isDisabled: true,
    },
    logIndex: 1,
    logRow: [],
  };

  const [watchButtons, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "Start":
        console.log("Start clicked");
        return {
          ...state,
          start: { ...state.start, id: "Pause", class: "enable-pause-btn" },
          clicked: "start",
          split: { ...state.split, isDisabled: false },
          reset: { ...state.reset, isDisabled: true },
        };
      case "Pause":
        console.log("Start clicked");
        return {
          ...state,
          start: { ...state.start, id: "Start", class: "enable-start-btn" },
          clicked: "pause",
          split: { ...state.split, isDisabled: true },
          reset: { ...state.reset, isDisabled: false },
          logIndex: state.logIndex + 1,
          logRow: [
            ...state.logRow,
            {
              id: state.logIndex,
              clock: Object.values(formatTime(state.timeCount)).join(":"),
              event: "Pause",
            },
          ],
        };
      case "Split":
        console.log("Split clicked");
        return {
          ...state,
          clicked: "split",
          logIndex: state.logIndex + 1,
          logRow: [
            ...state.logRow,
            {
              id: state.logIndex,
              clock: Object.values(formatTime(state.timeCount)).join(":"),
              event: "Split",
            },
          ],
        };
      case "Reset":
        console.log("Reset clicked");
        return {
          ...state,
          clicked: "reset",
          logIndex: 1,
          logRow: state.logRow.splice(0, state.logRow.length),
        };
      case "IncrementCount":
        return {
          ...state,
          timeCount: setTimeCount(state.timeCount, state.clicked),
        };
      default:
        return state;
    }
  }, defaultState);

  return (
    <UserContext.Provider value={watchButtons}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export default function StopWatch() {
  return (
    <>
      <UserProvider>
        <Clock />
        <Button name={"start"} />
        <Button name={"split"} />
        <Button name={"reset"} />
        <LogTable />
      </UserProvider>
    </>
  );
}

function LogTable() {
  const state = useContext(UserContext);
  let rows = state.logRow;

  const columns = [
    { key: "id", name: "" },
    { key: "clock", name: "" },
    { key: "event", name: "" },
  ];

  return <DataGrid columns={columns} rows={rows} />;
}

const Button = (props) => {
  const state = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const btnEnableDisable = !state[props.name].isDisabled
    ? state[props.name].class
    : "btn-disabled";

  return (
    <button
      id={state[props.name].id}
      className={`btn ${btnEnableDisable}`}
      onClick={() => dispatch(state[props.name].id)}
      disabled={state[props.name].isDisabled}
    >
      {state[props.name].id}
    </button>
  );
};

const Clock = () => {
  const state = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch("IncrementCount");
    }, 1);
    return () => clearInterval(interval);
  }, [state, dispatch]);

  return (
    <>
      <SetDisplay />
      <SetMiniDisplay />
    </>
  );
};

function SetDisplay() {
  const state = useContext(UserContext);
  let { hrs, min, sec, ms } = formatTime(state.timeCount);

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
  const state = useContext(UserContext);

  if (state.clicked === "none")
    return <p className="secondary-display">SPLIT TIME</p>;

  let { hrs, min, sec, ms } = formatTime(state.timeCount);

  return (
    <>
      <p className="secondary-display">
        {hrs}:{min}:{sec}.{ms % 1000}
      </p>
    </>
  );
}

function setTimeCount(count, action) {
  if (action === "start" || action === "split") {
    count = count + 1;
  } else if (action === "reset") {
    count = 0;
  }
  return count;
}

function formatTime(timeCount) {
  const ms = timeCount % 1000;
  const sec = pad(parseInt((timeCount / 100) % 60, 10));
  const min = pad(parseInt(timeCount / (60 * 100), 10));
  const hrs = pad(parseInt(timeCount / (3600 * 100), 10));

  return { hrs, min, sec, ms };
}

function pad(val) {
  return val > 9 ? val : "0" + val;
}

export { UserProvider, UserContext, UserDispatchContext };
