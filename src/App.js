import "./App.css";
import { useEffect, useState, createContext, useContext } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [buttonDetails, setButtonDetails] = useState({
    clicked: "none",
    timeCount: 0,
    start: {
      id: "Start",
      class: "enable-start-btn",
      isDisabled: false,
      clickHandler: startClicked,
    },
    split: {
      id: "Split",
      class: "enable-split-btn",
      isDisabled: true,
    },
    reset: {
      id: "Reset",
      class: "enable-reset-btn",
      isDisabled: false,
      clickHandler: resetClicked,
    },
  });

  function startClicked() {
    console.log("start clicked");
    buttonDetails.clicked = "start";
    console.log(buttonDetails);
    return;
  }

  function resetClicked() {
    console.log("reset clicked");
    buttonDetails.clicked = "reset";
    console.log(buttonDetails);
    return;
  }

  return (
    <UserContext.Provider value={buttonDetails}>
      <UserDispatchContext.Provider value={setButtonDetails}>
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
      </UserProvider>
    </>
  );
}

const Button = (props) => {
  const buttonDetails = useContext(UserContext);
  const setButtonDetails = useContext(UserDispatchContext);

  const btnEnableDisable = !buttonDetails[props.name].isDisabled
    ? buttonDetails[props.name].class
    : "btn-disabled";

  return (
    <button
      id={buttonDetails[props.name].id}
      className={`btn ${btnEnableDisable}`}
      onClick={buttonDetails[props.name].clickHandler}
      disabled={buttonDetails[props.name].isDisabled}
    >
      {buttonDetails[props.name].id}
    </button>
  );
};

const Clock = () => {
  const buttonDetails = useContext(UserContext);
  const setButtonDetails = useContext(UserDispatchContext);

  // console.log("Pre clock: buttonDetails: " + buttonDetails.clicked + " timeCount: " + buttonDetails.timeCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonDetails({
        ...buttonDetails,
        timeCount: setTimeCount(buttonDetails.timeCount, buttonDetails.clicked)
      });

      console.log("In clock: buttonDetails: " + buttonDetails.clicked + " timeCount: " + buttonDetails.timeCount);
    }, 1000);
    return () => clearInterval(interval);
  }, [buttonDetails, setButtonDetails]);

  function setTimeCount(count, action) {
    if (action === "start" || action === "split") {
      count = count + 1;
    } else if (action === "reset") {
      count = 0;
    }
    return count;
  }

  return (
    <>
      <SetDisplay />
      <SetMiniDisplay />
    </>
  );
};

function SetDisplay() {
  const buttonDetails = useContext(UserContext);
  let { hrs, min, sec, ms } = formatTime(buttonDetails.timeCount);

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
  const buttonDetails = useContext(UserContext);

  if (buttonDetails.clicked === "none")
    return <p className="secondary-display">SPLIT TIME</p>;

  let { hrs, min, sec, ms } = formatTime(buttonDetails.timeCount);

  return (
    <>
      <p className="secondary-display">
        {hrs}:{min}:{sec}.{ms % 1000}
      </p>
    </>
  );
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
