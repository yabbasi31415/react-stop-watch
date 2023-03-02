import React, { createContext, useContext, useReducer } from "react";
import { formatTime, setTimeCount } from "./utils";

const initialState = {
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

const reducer = (state, action) => {
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
};

const StopWatchContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});

export const StopWatchContextProvider = ({ children }) => {
  const context = useReducer(reducer, initialState);

  return (
    <StopWatchContext.Provider value={context}>
      {children}
    </StopWatchContext.Provider>
  );
};

export const useStopWatchContext = () => useContext(StopWatchContext);
