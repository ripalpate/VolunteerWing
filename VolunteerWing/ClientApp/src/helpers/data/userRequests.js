import axios from 'axios';

const apiUrl = '/api/user';

const getSingleUser = userId => axios.get(`${apiUrl}/${userId}`);

const createUser = userObject => axios.post(`${apiUrl}`, (userObject));

const updateUser = (userId, user) => axios.put(`${apiUrl}/${userId}`, user);

const getAllUsers = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const users = results.data;
      resolve(users);
    })
    .catch(err => reject(err));
});

export default {
  getSingleUser,
  createUser,
  updateUser,
  getAllUsers,
};
