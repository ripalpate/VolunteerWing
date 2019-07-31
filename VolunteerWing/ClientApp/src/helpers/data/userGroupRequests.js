import axios from 'axios';

const apiUrl = '/api/userGroup';

const createUserGroup = userGroup => axios.post(`${apiUrl}`, (userGroup));

export default {
  createUserGroup,
};
