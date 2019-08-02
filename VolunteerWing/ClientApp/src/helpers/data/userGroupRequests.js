import axios from 'axios';

const apiUrl = '/api/userGroup';

const createUserGroup = userGroup => axios.post(`${apiUrl}`, (userGroup));

const getAllUserEmailsByGroupId = groupId => axios.get(`${apiUrl}/emails/${groupId}`);

const deleteUserGroup = userGroupId => axios.delete(`${apiUrl}/${userGroupId}`);

export default {
  createUserGroup,
  getAllUserEmailsByGroupId,
  deleteUserGroup,
};
