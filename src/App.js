import "./App.css";
import { useEffect, useState, createContext, useContext } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [buttonDetails, setButtonDetails] = useState({
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
  });

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

  console.log(buttonDetails[props.name].class);

  const btnEnableDisable = !buttonDetails[props.name].isDisabled
    ? buttonDetails[props.name].class
    : "btn-disabled";

  return (
    <button
      id={buttonDetails[props.name].id}
      className={`btn ${btnEnableDisable}`}
      onClick={buttonDetails[props.name].clickHandler}
      disabled={false} //{buttonDetails.start.isDisabled}
    >
      {buttonDetails[props.name].id}
    </button>
  );
};

export { UserProvider, UserContext, UserDispatchContext };
