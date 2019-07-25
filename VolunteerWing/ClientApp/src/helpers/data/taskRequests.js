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

const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${taskId}`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    }).catch(err => reject(err));
});

const updatePeopleSignup = (taskId, taskObject) => axios.put(`${apiUrl}/signUp/${taskId}`, taskObject);

export default {
  createTask,
  getAllTasks,
  updatePeopleSignup,
  getSingleTask,
};
