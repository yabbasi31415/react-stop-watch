import { useSelector } from "react-redux";
import { formatTime } from "../utils/utils";
import * as styles from "./styles";
import { selectStateProp } from "../reducer";

export function MainDisplay() {
  const timeCount = useSelector(selectStateProp("timeCount"));
  const { hrs, min, sec, ms } = formatTime(timeCount);

  return (
    <>
      <p>
        {hrs}:{min}:{sec}.{ms % 10}
        <styles.Subscript>{ms % 100}</styles.Subscript>
      </p>
    </>
  );
}

export function SecondaryDisplay() {
  const timeCount = useSelector(selectStateProp("timeCount"));
  const clicked = useSelector(selectStateProp("clicked"));

  if (clicked === "none")
    return <styles.MiniDisplay>SPLIT TIME</styles.MiniDisplay>;

  const { hrs, min, sec, ms } = formatTime(timeCount);

  return (
    <>
      <styles.MiniDisplay>
        {hrs}:{min}:{sec}.{ms % 1000}
      </styles.MiniDisplay>
    </>
  );
}
