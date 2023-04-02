import './App.css'
import styled from 'styled-components'
import { useState } from 'react'


const AnswerButton = styled.button`
    background-color: #cccccc;
    width: 300px;
    height: fit content;
    border-radius: 1em;
    margin: 1em;
    color: black;
    font-size: 20px;
`

function Answers(props){

    return(
        <>
            <AnswerButton onClick={() => {props.checkIfCorrect(props.answer)}}>{props.answer}</AnswerButton>
        </>
    )
}

export default Answers