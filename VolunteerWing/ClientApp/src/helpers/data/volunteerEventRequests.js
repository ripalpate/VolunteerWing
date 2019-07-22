import axios from 'axios';

const apiUrl = '/api/volunteerEvent';

const createEvent = event => axios.post(`${apiUrl}`, (event));

const getSingleEvent = eventId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${eventId}`)
    .then((result) => {
      const singleEvent = result.data;
      singleEvent.id = eventId;
      resolve(singleEvent);
    }).catch(err => reject(err));
});

export default {
  createEvent,
  getSingleEvent,
};