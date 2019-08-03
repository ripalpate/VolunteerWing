import axios from 'axios';

const apiUrl = '/api/invitation';

const createDbInvitation = invitation => axios.post(`${apiUrl}`, (invitation));

const getAllInvitationsWithEventInfo = () => new Promise((resolve, reject) => {
  axios
    .get(`${apiUrl}/eventInfo`)
    .then((results) => {
      const events = results.data;
      resolve(events);
    })
    .catch(err => reject(err));
});

export default {
  createDbInvitation,
  getAllInvitationsWithEventInfo,
};
