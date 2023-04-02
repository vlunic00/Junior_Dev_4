import axios from "axios";
import styled from "styled-components";
import './App.css';

const QuestionField = styled.div`
    background-color: #b8b8b8;
    border-radius: 2em;
    height: 200px;
    width: 600px;
`
const Title = styled.h2`
    color: white;
    font-size: 48px;
`

const CurrentQuestion = styled.p`
    color: white;
    font-size: 32px;
`

function QuestionBox(props){

    return (
        <>
            <QuestionField>
                <Title>Pitanje {props.questionNumber}:</Title>
                <CurrentQuestion>Koje je odi pitanje?</CurrentQuestion>
            </QuestionField>
            <button onClick={props.get}>Dohvati</button>
        </>
    )
}

export default QuestionBox