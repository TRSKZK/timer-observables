
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { concat, interval, Subject, } from 'rxjs';

import { startWith, scan, takeWhile, takeLast, takeUntil} from 'rxjs/operators';
import { flatMap } from 'lodash';

const Container = styled.div`
display:flex;
margin:30px;
justify-content:center;
align-items: center;
flex-direction: column;

`
const ButtonsContainer = styled(Container)`
flex-direction: row;
gap:5px;

`
const pause = new Subject
const start$ = new Subject
const myInterval$ = interval(300).pipe(
  startWith(0),
  takeUntil(pause)
)



// const action$ = new Subject()

function App() {
  let [sec, setSec] = useState(0)
  let [min, setMin] =useState(0)
  let [start, setStart] = useState(false);
  
  useEffect(() => {
    
    if (start) {
      const sub = myInterval$.subscribe(setSec)
      return () => sub.unsubscribe()
      
    }
    
  },[start])

  const startEvent = () => {
    myInterval$.subscribe(setSec(0))
    myInterval$.subscribe(setStart(true))
  }
  
  const stopEvent = () => {
    myInterval$.subscribe(setSec(0))
    myInterval$.subscribe(setStart(false))
  }
  
  const waitEvent = () => {
    // const lastValue = sec
    // myInterval$.subscribe(setStart(false))
    // return lastValue
    pause.next()
  }
  
  const resetEvent = () => {
    myInterval$.subscribe(setSec(0))
    setMin(0)
    
 }

  
  // if (sec === 60 ) {
  //   const sub = myInterval$.subscribe(setSec(0))
  //  sub.unsubscribe()
  //   setMin(min+=1)
  // }
  
  return (
    <Container>
      <h1>{min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}</h1>

      <ButtonsContainer>
      <button onClick={startEvent}>Start</button>
      <button onClick={stopEvent}>Stop</button>
      <button onDoubleClick={waitEvent}>Wait</button>
      <button onClick={resetEvent}>Reset</button>


      </ButtonsContainer>
      
    </Container>
  );
}

export default App;
