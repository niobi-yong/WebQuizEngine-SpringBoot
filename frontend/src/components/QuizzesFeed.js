import React from 'react';

const QuizzesFeed = ({ title, text, del }) => {
  let styles = {
    maxWidth: '700px'
  };

  return (
      <div className="card border-dark bg-light text-dark text-center p-3 mb-3 ml-5 mr-5" style={styles}>
        <div className="card-header">
          <h2>{title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{text}</p>
        </div>
        <div>
          <button type="button" className="btn btn-outline-primary btn-rounded waves-effect mr-5" onClick={del}>Delete</button>
          <button type="button" className="btn btn-outline-primary btn-rounded waves-effect">Solve</button>
        </div>
      </div>
  );
}

export default QuizzesFeed;
