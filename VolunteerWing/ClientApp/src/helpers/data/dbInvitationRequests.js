import axios from 'axios';

const apiUrl = '/api/invitation';

const createDbInvitation = invitation => axios.post(`${apiUrl}`, (invitation));

export default {
  createDbInvitation,
};
