import React from 'react';
import { Link } from 'react-router-dom';

const QuizzesFeed = ({ title, text, del, itemDetails, deleteFail }) => {
  let styles = {
    minWidth: '700px'
  };

  return (
      <div className="card border-dark text-dark mb-3 ml-5 mr-5" style={styles}>
        <div className="card-header">
          <h2>{title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{text}</p>
        </div>
        <div className="card-footer">
          <button type="button" className="btn btn-outline-danger btn-rounded waves-effect" onClick={del}>Delete</button>
          {deleteFail && <span className="text-danger ml-3">Questions can only be deleted by its creator</span>}
          <Link to={`/quizzes/${itemDetails}`} className="ml-3 text-success">Solve</Link>
        </div>
      </div>
  );
}

export default QuizzesFeed;
