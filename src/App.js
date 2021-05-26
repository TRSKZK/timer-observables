
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { concat, interval, Subject } from 'rxjs';

import { startWith, scan, takeWhile} from 'rxjs/operators';

const Container = styled.div`
display:flex;
margin:30px;
justify-content:center;

`

const myInterval$ = interval(1000)



// const action$ = new Subject()

function App() {
  let [sec, setSec] = useState(0)
  let [start, setStart] = useState(false);
  
  useEffect(() => {
    
    if (start) {
      const sub = myInterval$.subscribe(setSec)
      return ()=> sub.unsubscribe()
    } 
  },[start])

  const startEvent =()=> myInterval$.subscribe(setStart(true))
  const stopEvent=()=> myInterval$.subscribe(setStart(false))
  
  
  
  return (
    <Container>
      <h1>{sec}</h1>
      <button onClick={startEvent}>Start</button>
      <button onClick={stopEvent}>Stop</button>
    </Container>
  );
}

export default App;
