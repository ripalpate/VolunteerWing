import React from 'react';
import PropTypes from 'prop-types';
import taskShape from '../../helpers/propz/taskShape';

class SingleTask extends React.Component {
    static propTypes = {
      task: taskShape,
    }

  render() {
    const { task } = this.props;
    return (
        <div className="row">
            <p className="col">{task.taskName}</p>
            <p className="col">Availble spots({task.numberOfPeopleNeed})</p>
            <p className="col">{task.numberOfPeopleSignUp} of {task.numberOfPeopleNeed} spots filled</p>
            <div className="col">
                <button className="bttn-pill bttn-warning"><i className="far fa-edit fa-1x"/></button>
                <button className="bttn-pill bttn-danger"><i className="fas fa-trash fa-1x"></i></button>
            </div>
        </div>
    );
  }
}

export default SingleTask;
