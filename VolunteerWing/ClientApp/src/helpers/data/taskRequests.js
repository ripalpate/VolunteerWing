import axios from 'axios';

const apiUrl = '/api/task';

const createTask = task => axios.post(`${apiUrl}`, (task));

const getAllTasks = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const tasks = results.data;
      resolve(tasks);
    })
    .catch(err => reject(err));
});

export default {
  createTask,
  getAllTasks,
};
