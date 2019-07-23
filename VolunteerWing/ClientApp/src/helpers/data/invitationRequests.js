import axios from 'axios';

const apiUrl = '/api/emailForm';

const createInvitation = invitation => axios.post(`${apiUrl}`, (invitation));

export default {
  createInvitation,
};
