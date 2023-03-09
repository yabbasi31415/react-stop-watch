import { useSelector } from "react-redux";
import * as styles from "./styles";
import { selectStateProp } from "../reducer";

export function LogTable() {
  const newLogEntry = useSelector(selectStateProp('newLogEntry'));
  const logIndex = useSelector(selectStateProp('logIndex'));

  return (
    <>
      <styles.Grid>
        {newLogEntry.map((newLogEntry, index) => (
          <>
            <styles.GridEntry key={logIndex}>{newLogEntry.id}</styles.GridEntry>
            <styles.GridEntry color={newLogEntry.event} key={newLogEntry.clock}>
              {newLogEntry.clock}
            </styles.GridEntry>
            <styles.GridEntry key={newLogEntry.event + toString(logIndex)}>
              {newLogEntry.event}
            </styles.GridEntry>
          </>
        ))}
      </styles.Grid>
    </>
  );
}
