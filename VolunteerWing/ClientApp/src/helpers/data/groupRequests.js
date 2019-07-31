import axios from 'axios';

const apiUrl = '/api/group';

const createGroup = group => axios.post(`${apiUrl}`, (group));

const getAllGroups = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const groups = results.data;
      resolve(groups);
    })
    .catch(err => reject(err));
});

export default {
  createGroup,
  getAllGroups,
};
