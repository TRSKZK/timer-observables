
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { concat, interval, Subject } from 'rxjs';

import { startWith, scan, takeWhile} from 'rxjs/operators';

const Container = styled.div`
display:flex;
margin:30px;
justify-content:center;

`

const myInterval$ = interval(1000).pipe(
  startWith(0),
  scan(time => time += 1),
  takeWhile(time => time <= 60 )
)


const minutes$ = concat(myInterval$)

// const action$ = new Subject()

function App() {
  let [sec, setSec] = useState(0)
  let [start, setStart] = useState(false);
  
  useEffect(() => {
    
    if(start === true) myInterval$.subscribe(setSec)
     
    console.log(start);
    return ()=> myInterval$.unsubscribe()
  },[])

  
  const handleClickFunction = () => {
    return start === false ? setStart(true)  : setStart(false)
  }
  
  
  return (
    <Container>
      <h1>{sec}</h1>
      <button onClick={()=> setStart(true)}>Start</button>
    </Container>
  );
}

export default App;
