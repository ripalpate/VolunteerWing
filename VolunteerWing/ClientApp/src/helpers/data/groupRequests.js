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

const getAllGroupsByAdminId = userId => new Promise((resolve, reject) => {
  axios
    .get(`${apiUrl}/groups/${userId}`)
    .then((results) => {
      const groups = results.data;
      resolve(groups);
    })
    .catch(err => reject(err));
});

const updateGroup = (groupId, group) => axios.put(`${apiUrl}/${groupId}`, group);

export default {
  createGroup,
  getAllGroups,
  getAllGroupsByAdminId,
  updateGroup,
};
