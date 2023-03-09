import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { start, pause, split, reset, selectEvent } from "../reducer";
import { Button } from "./button";
import {Div} from "./styles";

export function WatchButtons() {
  const startBtnLabel = useSelector(selectEvent("start", "id"));

  const dispatch = useDispatch();

  return (
    <Div>
      <Button
        label={startBtnLabel}
        onClick={() =>
          startBtnLabel === "Start" ? dispatch(start()) : dispatch(pause())
        }
        id={"start"}
        disabled={false}
      />
      <Button
        label="Split"
        onClick={() => dispatch(split())}
        id={"split"}
        disabled={useSelector(selectEvent("split", "isDisabled"))}
      />

      <Button
        label="Reset"
        onClick={() => dispatch(reset())}
        id={"reset"}
        disabled={useSelector(selectEvent("reset", "isDisabled"))}
      />
    </Div>
  );
}
