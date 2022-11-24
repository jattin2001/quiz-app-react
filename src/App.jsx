import React from "react";
import Start from "./components/Start"
import Question from "./components/Question";
import Footer from "./components/Footer";


export default function App(){

  const [startQuiz, setStartQuiz] = React.useState(false)
  const [mcq, setMcq] = React.useState([])
  const [showAnswer, setShowAnswer] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [reload, setReload] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  
  
  React.useEffect( ()=>{
    async function fetchData(){
    setLoading(true)
    try{
    const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    const data = await res.json()
    setMcq(data.results.map(quest=>{
      return (
        {
          question: quest.question,
          options: [quest.correct_answer, ...quest.incorrect_answers].sort(),
          correct_answer: quest.correct_answer,
          selected_answer: undefined
        })
      })
  )
    }
    catch (error){
      console.log('Error', error);
    }
    finally {
      setLoading(false)
    }
}

      fetchData()
}, [reload || !startQuiz])



  React.useEffect(()=>{
    let count = 0;
    if(showAnswer){
      mcq.forEach((quest)=>{
        quest.options[quest.selected_answer] === quest.correct_answer ? count++: count
      })
    }
    setScore(count)
  }, [showAnswer])



  function openQuiz(){
    setStartQuiz(!startQuiz)
  }


  function selectAnswer(event, questionId, optionId){
        setMcq(mcq.map((quest, qId)=>{
          if(qId === questionId){
            return ({...quest, selected_answer: optionId})
          }
          else{
            return quest
          }
        }))
  }

  function checkAnswers(){
    setShowAnswer(!showAnswer);
  }

  function reloadQuiz(){
    if(showAnswer){
      setScore(0)
      setShowAnswer(!showAnswer)
      setReload(!reload) 
}
  }

  const mcqElements = mcq.map((quest,index)=>{
    return (<Question 
      key={index}
      id={index}
      mcq={quest}
      question={quest.question}
      options={quest.options}
      correct_answer={quest.correct_answer}
      selectedOption={selectAnswer}
      showAnswer={showAnswer}
    />)
  })

  return (
    <>
    {startQuiz ? <div className="quiz-page">
      {loading ? <h2 className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></h2> : mcqElements} 
      {showAnswer && <h1 className="score">Score: {score}/5</h1>}
      {showAnswer && !loading? <button onClick={reloadQuiz} className="check-btn">Reload Quiz</button> :
      !loading && <button className="check-btn" onClick={checkAnswers}>Check Answers</button>}
      </div> 
      : <Start handleClick={()=>openQuiz()}/>}

      <Footer />
    </>
  )
}