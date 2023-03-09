import React from "react";
import { WatchButtons } from "../buttons/watchButtons";
import { Clock } from "../clock/clock";
import { LogTable } from "../logTable/logTable";
import { GlobalStyle } from "./styles";

function StopWatch() {
  return (
    <>
      <GlobalStyle />
      <Clock />
      <WatchButtons />
      <LogTable />
    </>
  );
}

export default StopWatch;
