import React from 'react';

const CompletionFeed = ({ id, timestamp }) => {
  let styles = {
    maxWidth: '700px'
  };

  return (
      <div className="card border-dark bg-light text-dark text-center p-3 mt-5 mb-3 ml-5 mr-5" style={styles}>
        <div className="card-header">
          <h2>{id}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{timestamp}</p>
        </div>
      </div>
  );
}

export default CompletionFeed;
