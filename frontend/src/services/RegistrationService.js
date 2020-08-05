import axios from 'axios';

const baseUrl = 'http://localhost:8889/api/register';

const createUser = newUserObject => {
    const request = axios.post(baseUrl, newUserObject);
    return request;
}

export default { createUser };