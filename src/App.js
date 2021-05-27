
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {  interval, Subject, } from 'rxjs';

import { repeatWhen, startWith, takeUntil} from 'rxjs/operators';
import { ButtonsComponent } from './ButtonsComponent';

const Container = styled.div`
display:flex;
margin:30px;
justify-content:center;
align-items: center;
flex-direction: column;

`
export const ButtonsContainer = styled(Container)`
flex-direction: row;
gap:5px;

`

const pause = new Subject()
const start$ = new Subject()

const myInterval$ = interval(1000).pipe(
  startWith(0),
  takeUntil(pause),
  repeatWhen(()=>start$)
)



function App() {
  let [sec, setSec] = useState(0)
  let [min, setMin] = useState(0)
  let [start, setStart] = useState(false);
  
  useEffect(() => {
    
    if (start) {
      const sub = myInterval$.subscribe(setSec)
      return () => sub.unsubscribe()
      
    }
    
  },[start])

  const startEvent = () => {
    myInterval$.subscribe(setStart(true))
    start$.next()
  }
  
  const stopEvent = () => {
    myInterval$.subscribe(setSec(0))
    myInterval$.subscribe(setStart(false))
    setMin(0)
  }
  
  const waitEvent = () => {
    pause.next()
  }
  
  const resetEvent = () => {
    myInterval$.subscribe(setSec(0))
    setMin(0)
    
 }

  const minuteIncrese = () => {
    if (sec === 60) {
      const sub = myInterval$.subscribe(setSec(0))
      sub.unsubscribe()
      setMin(min += 1)
    }
  }
  minuteIncrese()


  return (
    <Container>
      <h1>{min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}</h1>
      <ButtonsComponent
        start={startEvent}
        stop={stopEvent}
        wait={waitEvent}
        reset={resetEvent} />
      
    </Container>
  );
}

export default App;

