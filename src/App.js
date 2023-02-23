import './App.css';
import {useState} from 'react';

function Buttons() {
  const [cls,setCls]=useState({});

  const [classes,setClasses]=useState({'start':'enable-start-btn','split':'disable-btn', 'reset':'disable-btn'});
 
  console.log("Init " + classes.start + " " + classes.split + " " + classes.reset);

  const [value, setValue]=useState('Start');

  function handleClick(event)
  {
    if (event == 'Start') 
    {
      if (value == 'Start')  
      {
        setValue('Pause');
        
        setClasses(classes => ({start:'enable-pause-btn',split:'enable-split-btn', reset:'disable-btn'}));
        console.log("OnBtn " + classes.start + " " + classes.split + " " + classes.reset);
        
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

function Start() {
  const [cls,setCls]=useState('enable-start-btn');
  const [value, setValue]=useState('Start');
  const [btn, setBtn]=useState('');

  function handleClick()
  {
    if (value == 'Start') {
      setValue('Pause');
      setCls('enable-pause-btn'); 
      setBtn(<Split value={'event-pause'} />);
    }
    else
    {
      setValue('Start');
      setCls('enable-start-btn'); 
    }
  }

  return (   
    <>
      <button className={cls} onClick={()=>handleClick()}>{value}</button>
    </>
    );
  
}

function Split({value}) {
  const [cls,setCls]=useState('disable-btn');

  if ({value} == 'event-pause')
  {
    console.log({value});
    setCls('enable-split-btn');
  }

  function handleClick()
  {
    // setCls('enable-split-btn');
  }

  return (
    <>
      <button className={cls} onClick={()=>handleClick()}>Split</button>
    </>
  );
}

function Reset() {
  const [cls,setCls]=useState('disable-btn');

  function handleClick()
  {
    // setCls('enable-split-btn');
  }

  return (
    <>
      <button className={cls} onClick={()=>handleClick()}>Reset</button>
    </>
  );
}

function startTimer(count)
{
  return ['00',':','50',':','00','.','50'];
}

function handleClick (i) {
  console.log("Button clicked " + i);
  return <Start value={'Pause'} />;
}

function handleStartClick (value)
{

}


export default function StopWatch () {

  const [display, setDisplay] = useState(['00',':','00',':','00','.','00']);

  return (
    <>
    <p> {display} </p>

    <Buttons />
    </>
  );
}

function pad (val) {
  return val > 9 ? val : '0' + val;
}
