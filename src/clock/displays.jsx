import { useSelector } from "react-redux";
import { formatTime } from "../utils/utils";
import {MiniDisplay, Subscript} from "./styles"; // import by name as list
import { selectStateProp } from "../reducer";

export function MainDisplay() {
  const timeCount = useSelector(selectStateProp("timeCount"));
  const { hrs, min, sec, ms } = formatTime(timeCount);

  return (
    <>
      <p>
        {hrs}:{min}:{sec}.{ms % 10}
        <Subscript>{ms % 100}</Subscript>
      </p>
    </>
  );
}

export function SecondaryDisplay() {
  const timeCount = useSelector(selectStateProp("timeCount"));
  const clicked = useSelector(selectStateProp("clicked"));

  if (clicked === "none")
    return <MiniDisplay>SPLIT TIME</MiniDisplay>;

  const { hrs, min, sec, ms } = formatTime(timeCount);

  return (
    <>
      <MiniDisplay>
        {hrs}:{min}:{sec}.{ms % 1000}
      </MiniDisplay>
    </>
  );
}
