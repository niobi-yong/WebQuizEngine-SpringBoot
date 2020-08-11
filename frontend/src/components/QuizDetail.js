import React from 'react';

const QuizDetail = ({ title, text, options, addAnswer, handleCheckboxChange, correctAnswer, wrongAnswer }) => {
    let styleBox = {
        height: '25px',
        width: '25px'
    }
    
    let style = {
      minWidth: '600px'
    }

    const checkboxes = options.map((option, index) => {
        return (
                <li className="list-group-item" key={index}>
                    <label className="checkbox checkbox-inline">
                    <input type="checkbox" name={index} onChange={handleCheckboxChange} style={styleBox} /> {option}
                    </label>
                </li>
        )
    })

    return (
      <div className="card border-dark text-dark mt-5 mb-3 ml-5 mr-5" style={style}>
        <div className="card-header bg-transparent border-primary">
          <h2>{title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{text}</p>
        </div>
        <div>
            <ul className="list-group p-3">
                <form onSubmit={addAnswer}>
                {checkboxes}
                <br/>
                <button type="submit" className="btn btn-outline-success btn-rounded waves-effect">Check</button>
                {correctAnswer && <span className="text-success ml-3">Well done! The answer is correct.</span>}
                {wrongAnswer && <span className="text-danger ml-3">Wrong answer, try again.</span>}
                </form>
            </ul>
        </div>
      </div>
    );
}

export default QuizDetail;
