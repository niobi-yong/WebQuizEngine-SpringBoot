import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const baseUrl = 'http://localhost:8889/api/quizzes';

const auth = { 
    headers: {
        authorization: AuthenticationService.getAuthenticationToken()
    } 
};

const getAll = quizId => {
    const request = axios.get(`${baseUrl}/${quizId}`, auth);
    return request
            .then(response => response.data)
            .catch((response) => console.log('error', response));
};

const createAnswer = (quizId, newAnswer) => {
    const request = axios.post(`${baseUrl}/${quizId}/solve`, newAnswer, auth);
    return request;
};

export default { getAll, createAnswer };
