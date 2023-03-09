import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrementCount } from "../reducer";
import { MainDisplay, SecondaryDisplay } from "./displays";


export const Clock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementCount());
    }, 1);
    return () => clearInterval(interval);
  });

  return (
    <div className="clock">
      <MainDisplay />
      <SecondaryDisplay />
    </div>
  );
};
