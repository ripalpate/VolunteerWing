import axios from 'axios';

const apiUrl = '/api/user';

const getSingleUser = userId => axios.get(`${apiUrl}/${userId}`);


export default {
  getSingleUser,
};
