import axios from 'axios'
import { useState } from 'react'
import Answers from './Answers'
import './App.css'
import QuestionBox from './QuestionBox'
import { useEffect } from 'react'

function App() {

  const [questionSet, setQuestionSet] = useState([])
  const [questionNumber, setQuestionNumber] = useState(1)
  const [listOfAnswers, setListOfAnswers] = useState([])

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    axios.get("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple", {cancelToken: source.token})
      .then(res => {
        setQuestionSet(res.data.results)
        return res})
      .then(res => getAnswers(res.data.results))

    return() => {
      source.cancel();
    }
  }, [])

  function getAnswers(data){
    data[questionNumber - 1].incorrect_answers.map(el => setListOfAnswers(current => [...current, el]))
    setListOfAnswers(current => [...current, data[questionNumber - 1].correct_answer])
  }
/* 
  function getQuestion(source) {
    axios.get("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple", {cancelToken: source.token})
      .then(res => {
        setQuestionSet(res.data.results)
        return res})
      .then(res => getAnswers(res.data.results))
  } */

  function ispisi(){
    console.log(questionSet)
    //getAnswers(questionSet)
    console.log(listOfAnswers)
  }

  return (
    <>
      <div className='home-page'>
        <div className='q&a'>
          <QuestionBox questionSet={questionSet} questionNumber={questionNumber}/>
          <button onClick={ispisi}>Ispisi</button>
          <Answers questionSet={questionSet}/>
        </div>
        <div className='info'>

        </div>
      </div>
    </>
  )
}

export default App
