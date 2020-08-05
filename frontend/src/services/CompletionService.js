import axios from 'axios';
import AuthenticationService from './AuthenticationService';

const baseUrl = 'http://localhost:8889/api/quizzes/completed';

const getAll = page => {
    const request = axios.get(`${baseUrl}?page=${page}`, { 
        headers: {
            authorization: AuthenticationService.getAuthenticationToken()
        } 
    });
    return request
            .then(response => response.data)
            .catch((response) => console.log('error', response));
};

export default { getAll };
