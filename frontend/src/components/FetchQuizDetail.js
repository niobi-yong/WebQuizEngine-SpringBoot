import React, { useState, useEffect } from 'react';
import QuizDetailService from '../services/QuizDetailService';
import QuizDetail from './QuizDetail';

const FetchQuizDetail = ({ match }) => {
  const[ quiz, setQuiz] = useState({
      options: []
  });
  const[ correctAnswer, setCorrectAnswer ] = useState(false);
  const[ wrongAnswer, setWrongAnswer ] = useState(false);
  const[ answer, setAnswer ] = useState([]);

  useEffect(() => {
    QuizDetailService
      .getAll(match.params.id)
      .then(returnedQuiz => {
        setQuiz(returnedQuiz);
      });
  }, [match.params.id]);

  const addAnswer = (event) => {
    event.preventDefault();
    const newAnswer = {
        answer: answer
    }
    
  QuizDetailService
    .createAnswer(match.params.id, newAnswer)
    .then(() => {
      setCorrectAnswer(true);
    })
    .catch(response => {
      setWrongAnswer(true);
      console.log('error', response)
    });
  };

  const handleCheckboxChange = (event) => {
    setCorrectAnswer(false);
    setWrongAnswer(false);

    if (!answer.includes(event.target.name)) {
      if (event.target.checked) {
        setAnswer(answer.concat(event.target.name));
      }
    } else {
        setAnswer(answer.filter(ans => ans !== event.target.name));
    }
  };

  return (
    <div>      
    <QuizDetail
        title={quiz.title}
        text={quiz.text}
        options={[...quiz.options]}
        addAnswer={addAnswer}
        handleCheckboxChange={handleCheckboxChange}
        correctAnswer={correctAnswer}
        wrongAnswer={wrongAnswer}
    />
    </div>
  );
};

export default FetchQuizDetail;
