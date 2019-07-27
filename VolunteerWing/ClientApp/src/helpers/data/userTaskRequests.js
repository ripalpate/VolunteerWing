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

const getAllEventsThatUserSignup = userId => new Promise((resolve, reject) => {
  axios
    .get(`${apiUrl}/event/${userId}`)
    .then((results) => {
      const signupEvents = results.data;
      resolve(signupEvents);
    })
    .catch(err => reject(err));
});

const deleteUserTask = userTaskId => axios.delete(`${apiUrl}/${userTaskId}`);

export default {
  createUserTask,
  getAllUsersTasks,
  getAllEventsThatUserSignup,
  deleteUserTask,
};
