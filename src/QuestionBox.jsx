
import { useEffect, useState } from "react";
import styled from "styled-components";
import './App.css';
import Answers from "./Answers";

const QuestionField = styled.div`
    background-color: #b8b8b8;
    border-radius: 2em;
    height: fit content;
    width: 700px;
`
const Title = styled.h2`
    color: white;
    font-size: 48px;
`

const CurrentQuestionText = styled.p`
    color: white;
    font-size: 32px;
`

const AnswerField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function QuestionBox(props){


   
   
    // useEffect se ovdje poziva dvaputa (nema cleanupa), ali s obzirom da se radi shuffle, je li to i dalje
    // problem, ili u ovom slucaju ne treba raditi cleanup (ovako je niz jos vise promjesan)
    useEffect(() => {
        shuffleArray(props.answerSet)
    }, [props.questionSet])

   
   
    function shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    return (
        <>
            <QuestionField>
                <Title>Pitanje {props.questionNumber}:</Title>
                <CurrentQuestionText>{props.currentQuestion}</CurrentQuestionText>
            </QuestionField>
            <AnswerField>
                {props.answerSet.map(el => (
                    <Answers key={el} answer={el} correctAnswer={props.correctAnswer} checkIfCorrect={props.checkIfCorrect}/>
                ))}
            </AnswerField>

        </>
    )
}

export default QuestionBox