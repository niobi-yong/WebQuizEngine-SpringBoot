import React, {useState} from 'react';
import quizService from '../services/Quizzes';

const CreateQuiz = () => {
    const[ newTitle, setNewTitle ] = useState('');
    const[ newText, setNewText ] = useState('');
    const[ newOptions, setNewOptions ] = useState([]);
    const[ newAnswer, setNewAnswer ] = useState([]);
    const[ createSuccessful, setCreateSuccessful ] = useState(false);

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
          .then(() => {
            setCreateSuccessful(true);
            setNewTitle('');
            setNewText('');
            setNewOptions('');
            setNewAnswer('');
          });
      };

      const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
        setCreateSuccessful(false);
      };
    
      const handleTextChange = (event) => {
        setNewText(event.target.value);
        setCreateSuccessful(false);
      };
    
      const handleOptionsChange = (event) => {
        const optionArr = event.target.value.split(',');
        setNewOptions(optionArr);
      };
    
      const handleAnswerChange = (event) => {
        const answerArr = event.target.value.split(',');
        setNewAnswer(answerArr);
      };
      return (
        <div className="container-fluid">
          <div className="row">
          <div className="card border border-dark p-3 mb-3 ml-5 mr-5 mt-5 col-sm-4">
            <h3>{createSuccessful && <p className="text-success">Your question has been added.</p>}</h3>
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
          </div>
        </div>
      );
};

export default CreateQuiz;

