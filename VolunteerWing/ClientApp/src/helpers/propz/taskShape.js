import PropTypes from 'prop-types';

const taskShape = PropTypes.shape({
  taskName: PropTypes.string.isRequired,
  numberOfPeopleNeed: PropTypes.number.isRequired,
  numberOfPeopleSignUp: PropTypes.number.isRequired,
  comment: PropTypes.string,
  eventId: PropTypes.number.isRequired,
});

export default taskShape;
