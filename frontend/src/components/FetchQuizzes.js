import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import QuizzesFeed from './QuizzesFeed';
import quizService from '../services/Quizzes';

const FetchQuizzes = () => {
  const[ quizzes, setQuizzes] = useState([]);
  const[ activePage, setActivePage ] = useState(0);
  const[ itemsCountPerPage, setItemsCountPerPage ] = useState(0);
  const[ totalItemsCount, setTotalItemsCount ] = useState(0);

  const[ newTitle, setNewTitle ] = useState('');
  const[ newText, setNewText ] = useState('');
  const[ newOptions, setNewOptions ] = useState([]);
  const[ newAnswer, setNewAnswer ] = useState([]);

  useEffect(() => {
    quizService
      .getAll(activePage)
      .then(initialQuizzes => {
          setQuizzes(initialQuizzes.content);
          setItemsCountPerPage(initialQuizzes.size);
          setTotalItemsCount(initialQuizzes.totalElements);
      });
  }, [activePage]);
 
  const addQuiz = (event) => {
    event.preventDefault();

    const newQuiz = {
      title: newTitle,
      text: newText,
      options: newOptions,
      answer: newAnswer
    };

    quizService
      .create(newQuiz)
      .then(returnedQuiz => {
        setQuizzes(quizzes.concat(returnedQuiz));
        setNewTitle('');
        setNewText('');
        setNewOptions('');
        setNewAnswer('');
      });
  };

  const deleteQuiz = (id) => {
    quizService
      .remove(id)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
      })
      .catch(response => console.log('error', response.data));
  };


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setNewText(event.target.value);
  };

  const handleOptionsChange = (event) => {
    const optionArr = event.target.value.split(',');
    setNewOptions(optionArr);
  };

  const handleAnswerChange = (event) => {
    const answerArr = event.target.value.split(',');
    setNewAnswer(answerArr);
  };

  const quizzesData = quizzes.map(quiz => {
    return (
      <QuizzesFeed
        key={quiz.id}
        title={quiz.title}
        text={quiz.text}
        del={() => deleteQuiz(quiz.id)}
      />
    )

  });

  const handlePageNumber = (pageNumber) => {
    setActivePage(pageNumber - 1);
  }

  return (
    <div>
      <div className="card border border-dark p-3 mb-3 ml-5 mr-5 mt-5">
        <form onSubmit={addQuiz}>
          <h3>Create a new question</h3>
          <label>Title</label>
          <input value={newTitle} onChange={handleTitleChange} className="form-control" id="title" />
          <br/>
          <label>Question</label>
          <textarea value={newText} onChange={handleTextChange} className="form-control md-textarea" id="question" rows="5" />
          <br/>
          <label>Fill in your options for your question. Separate each option with a ,</label>
          <input value={newOptions} onChange={handleOptionsChange} className="form-control" id="options" />
          <br/>
          <label>Fill in the index of the correct answers for your question. Separate each answer with a ,</label>
          <input value={newAnswer} onChange={handleAnswerChange} className="form-control" id="answer" />
          <br/>
          <button type="submit" className="btn btn-outline-success btn-rounded waves-effect">Save</button>
        </form>
      </div>
      <br/>
      <hr/>
      
      {quizzesData}

      <div className="d-flex justify-content-center">
        <Pagination
         hideNavigation
         activePage={activePage}
         itemsCountPerPage={itemsCountPerPage}
         totalItemsCount={totalItemsCount}
         pageRangeDisplayed={10}
         itemClass='page-item'
         linkClass='btn btn-light'
         onChange={handlePageNumber}
         />
       </div>
    </div>
  );
};

export default FetchQuizzes;
