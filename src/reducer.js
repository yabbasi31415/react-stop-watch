import { createSlice } from "@reduxjs/toolkit";
import { formatTime, setTimeCount } from "./utils/utils";

const initialState = {
  clicked: "none",
  timeCount: 0,
  start: {
    id: "Start",
  },
  split: {
    isDisabled: true,
  },
  reset: {
    isDisabled: true,
  },
  logIndex: 0,
  newLogEntry: [],
};

export const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState,
  reducers: {
    start: (state) => {
      state.start.id = "Pause";
      state.clicked = "start";
      state.split.isDisabled = false;
      state.reset.isDisabled = true;
    },
    pause: (state) => {
      state.start.id = "Start";
      state.clicked = "pause";
      state.split.isDisabled = true;
      state.reset.isDisabled = false;
      state.logIndex += 1;
      state.newLogEntry.push({
        id: state.logIndex,
        clock: Object.values(formatTime(state.timeCount)).join(":"),
        event: "Pause",
      });
    },
    split: (state) => {
      state.clicked = "split";
      state.logIndex += 1;
      state.newLogEntry.push({
        id: state.logIndex,
        clock: Object.values(formatTime(state.timeCount)).join(":"),
        event: "Split",
      });
    },
    reset: (state) => {
      state.clicked = "reset";
      state.logIndex = 0;
      state.newLogEntry = [];
    },
    incrementCount: (state) => {
      state.timeCount = setTimeCount(state.timeCount, state.clicked);
    },
  },
});

export const { start, pause, split, reset, incrementCount } =
  stopwatchSlice.actions;

export const selectEvent = (button, prop) => (state) =>
  state.stopwatch[button][prop];

export const selectStateProp = (prop) => (state) =>
  state.stopwatch[prop];

export default stopwatchSlice.reducer;
