import axios from 'axios'
import { useState } from 'react'
import './App.css'
import QuestionBox from './QuestionBox'
import { useEffect } from 'react'

function App() {

  const [questionSet, setQuestionSet] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [answerSet, setAnswerSet] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [score, setScore] = useState(0)

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios.get("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple", {cancelToken: source.token})
      .then(res => {
        setQuestionSet(res.data.results)
        return res})
      .then(res => {
        getAnswers(res.data.results)
        return res})
      .then(res => setCurrentQuestion(res.data.results[0].question))

    return() => {
      source.cancel();
    }
  }, [])



  function getAnswers(data){
    data[questionNumber].incorrect_answers.map(el => setAnswerSet(current => [...current, el]))
    setAnswerSet(current => [...current, data[questionNumber].correct_answer])
    setCorrectAnswer(data[questionNumber].correct_answer)
  }

  function checkIfCorrect(id){
    if(id == correctAnswer){
        setScore(score + 1)
        setQuestionNumber(questionNumber + 1)
        setCurrentQuestion(questionSet[questionNumber].question)
        setAnswerSet([])
        getAnswers(questionSet)
    }
    else{
    setQuestionNumber(questionNumber + 1)
    setCurrentQuestion(questionSet[questionNumber].question)
    setAnswerSet([])
    getAnswers(questionSet)
    }
}

  if(!questionSet){
    return(
      <p>Loading...</p>
    )
  }

  return (
    <>
      <div className='home-page'>
        <div className='q&a'>
          <QuestionBox questionSet={questionSet} questionNumber={questionNumber} answerSet={answerSet} correctAnswer={correctAnswer}
            checkIfCorrect={checkIfCorrect} currentQuestion={currentQuestion}/>
        </div>
        <div className='info'>
          <p>{score}</p>
        </div>
      </div>
    </>
  )
}

export default App
