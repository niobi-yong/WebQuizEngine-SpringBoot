import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const baseUrl = 'http://localhost:8889/api/quizzes';
const auth = { 
    headers: {
        authorization: AuthenticationService.getAuthenticationToken()
    } 
};

const getAll = page => {
    const request = axios.get(`${baseUrl}?page=${page}`, auth);
    return request
            .then(response => response.data)
            .catch((response) => console.log('error', response));
};


const create = newQuiz => {
    const request = axios.post(baseUrl,  newQuiz, auth);
    return request
            .then(response => response.data)
            .catch((response) => console.log('error', response));
};

const remove = quizId => {
    const request = axios.delete(`${baseUrl}/${quizId}`, auth);
    return request;
}

export default {getAll, create, remove};
