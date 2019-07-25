import axios from 'axios';

const apiUrl = '/api/userTask';

const createUserTask = userTask => axios.post(`${apiUrl}`, (userTask));

export default {
  createUserTask,
};
