import axios from 'axios';

const apiUrl = '/api/userTask';

const createUserTask = userTask => axios.post(`${apiUrl}`, (userTask));

const getAllUsersTasks = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const usersTasks = results.data;
      resolve(usersTasks);
    })
    .catch(err => reject(err));
});

export default {
  createUserTask,
  getAllUsersTasks,
};
