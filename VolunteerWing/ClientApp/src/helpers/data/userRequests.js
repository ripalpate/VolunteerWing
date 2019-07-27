import axios from 'axios';

const apiUrl = '/api/user';

const getSingleUser = userId => axios.get(`${apiUrl}/${userId}`);

const createUser = userObject => axios.post(`${apiUrl}`, (userObject));

const updateUser = (userId, user) => axios.put(`${apiUrl}/${userId}`, user);

export default {
  getSingleUser,
  createUser,
  updateUser,
};
