import React from 'react'
import styled from 'styled-components'
import { ButtonsContainer } from './App'



export const ButtonsComponent = ({start, stop, wait, reset}) => {
    return (
        <ButtonsContainer>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onDoubleClick={wait}>Wait</button>
            <button onClick={reset}>Reset</button>
        </ButtonsContainer> 
    )
}


