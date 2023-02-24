import './App.css';
import { useEffect, useState } from "react";

const MillisecondTimer = () => {
  const [millisec, setMillisec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMillisec(millisec => millisec+1);
    }, 1);
    return () => clearInterval(interval);
  }, []);

  let ms = millisec % 1000;
  let sec = pad (parseInt (millisec / 100 % 60, 10));
  let min = pad (parseInt (millisec / (60 * 100), 10));
  let hrs = pad (parseInt (millisec / (3600 * 100), 10));
  

  return (
    <>
    <p><span>{hrs}</span>:<span>{min}</span>:<span>{sec}</span>.<span>{ms % 10}</span><span className='subscript-timer'>{ms}</span></p>
    </>
  );
};

function Buttons({setDisplay}) {
 
  const [classes,setClasses]=useState({'start':'enable-start-btn','split':'disable-btn', 'reset':'disable-btn'});
 
  // console.log("Init " + classes.start + " " + classes.split + " " + classes.reset);

  const [value, setValue]=useState('Start');

  function handleClick(event)
  {
    if (event == 'Start') 
    {
      if (value == 'Start')  
      {
        setValue('Pause');
        
        setClasses(classes => ({start:'enable-pause-btn',split:'enable-split-btn', reset:'disable-btn'}));
        // console.log("OnBtn " + classes.start + " " + classes.split + " " + classes.reset);

        ManageTimer(event, {setDisplay});
        
      }
      else
      {
        setValue('Start');
        setClasses(classes => ({start:'enable-start-btn',split:'disable-btn', reset:'enable-reset-btn'}));
        
      }
    }
    else if (event == 'Reset')
    {
      setValue('Start');
      setClasses(classes => ({start:'enable-start-btn',split:'disable-btn', reset:'enable-reset-btn'}));
    }

  }

  return (   
    <>
      <button className={classes.start} onClick={()=>handleClick('Start')}>{value}</button>
      <button className={classes.split} onClick={()=>handleClick('Split')}>Split</button>
      <button className={classes.reset} onClick={()=>handleClick('Reset')}>Reset</button>
    </>
    );
  
}

function ManageTimer(event, {setDisplay})
{
  // const [disp, setDisp] = useState(['00',':','00',':','00','.','00']);
  // const [tmr, setTmr] = useState(0);
  // setTmr(tmr+1);

  // setInterval(setTmr(tmr+1), 1);

  // const interval = setInterval(setTimer(timer+1), 1);
      // ms = ++timerCounter % 1000;
      // sec = pad (parseInt (timerCounter / 100 % 60, 10));
      // min = pad (parseInt (timerCounter / (60 * 100), 10));
  
  
  // setDisp(disp[6] = setTimer(timer+1) % 1000);
  // disp[4] = pad (parseInt (timer / (100 % 60), 10));
  // disp[2] = pad (parseInt (timer / (60 * 100), 10));
  // disp[0] = pad (parseInt (timer / (3600 * 100), 10));

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimer();
  //   }, 1000);
  // });
    // return (<IntervalExample />);
  
      // setDisplay([count[0],':',count[2],':',count[4],'.',count[6]]);
    
      // let timeLapsedArr = [hrs, min, sec, ms, timerCounter];

  // let interval = setInterval (startTimer({timer, setTimer}), 1);

  // console.log(interval);
   
}


export default function StopWatch () {

  const [display, setDisplay] = useState(['00',':','00',':','00','.','00']);

  return (
    <>
    {/* <p> {display} </p> */}
    <MillisecondTimer />
    <Buttons value={setDisplay}/>
    </>
  );
}

function pad (val) {
  return val > 9 ? val : '0' + val;
}
