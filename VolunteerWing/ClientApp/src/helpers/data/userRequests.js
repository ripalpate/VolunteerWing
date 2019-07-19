import axios from 'axios';

const apiUrl = '/api/user';

const getSingleUser = userId => axios.get(`${apiUrl}/${userId}`);

const createUser = userObject => axios.post(`${apiUrl}`, (userObject));

export default {
  getSingleUser,
  createUser,
};
