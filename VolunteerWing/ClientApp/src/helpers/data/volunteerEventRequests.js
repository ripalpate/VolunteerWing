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

const getAllEvents = () => new Promise((resolve, reject) => {
  axios
    .get(apiUrl)
    .then((results) => {
      const events = results.data;
      resolve(events);
    })
    .catch(err => reject(err));
});

const updateEvent = (eventId, event) => axios.put(`${apiUrl}/${eventId}`, event);

export default {
  createEvent,
  getSingleEvent,
  getAllEvents,
  updateEvent,
};
