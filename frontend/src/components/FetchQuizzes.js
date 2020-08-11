import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import QuizzesFeed from './QuizzesFeed';
import quizService from '../services/Quizzes';

const FetchQuizzes = () => {
  const[ quizzes, setQuizzes] = useState([]);
  const[ activePage, setActivePage ] = useState(0);
  const[ itemsCountPerPage, setItemsCountPerPage ] = useState(0);
  const[ totalItemsCount, setTotalItemsCount ] = useState(0);
  const[ deleteFail, setDeleteFail ] = useState(false);
  
  useEffect(() => {
    quizService
      .getAll(activePage)
      .then(initialQuizzes => {
          setQuizzes(initialQuizzes.content);
          setItemsCountPerPage(initialQuizzes.size);
          setTotalItemsCount(initialQuizzes.totalElements);
      });
  }, [activePage]);

  const deleteQuiz = (id) => {
    quizService
      .remove(id)
      .then(() => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
      })
      .catch(response => {
        setDeleteFail(true);
        console.log('error', response.data)
    });
  };

  const quizzesData = quizzes.map(quiz => {
    return (
      <QuizzesFeed
        key={quiz.id}
        title={quiz.title}
        text={quiz.text}
        del={() => deleteQuiz(quiz.id)}
        itemDetails={quiz.id}
        deleteFail={deleteFail}
      />
    )
  });

  const handlePageNumber = (pageNumber) => {
    setActivePage(pageNumber - 1);
  }

  return (
    <div className="mb-3 mt-5">
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
