import React from 'react';
import taskShape from '../../helpers/propz/taskShape';

class SingleTask extends React.Component {
    static propTypes = {
      task: taskShape,
    }

    render() {
      const { task, isCreating } = this.props;

      const makeButtons = () => {
        if (isCreating === false) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-success" title="signup"><i className="fas fa-file-contract fa-1x"></i></button>
            <button className="bttn-pill bttn-danger ml-2" title="delete"><i className="fas fa-trash fa-1x"></i></button>
          </td>
          );
        } if (isCreating === true) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-warning"><i className="far fa-edit fa-1x"/></button>
            <button className="bttn-pill bttn-danger ml-2"><i className="fas fa-trash fa-1x"></i></button>
          </td>
          );
        }
      };

      return (
        <tr>
            <td>{task.taskName}</td>
            <td>Availble spots({task.numberOfPeopleNeed})</td>
            <td>{task.numberOfPeopleSignUp} of {task.numberOfPeopleNeed} spots filled</td>
            {makeButtons()}
        </tr>
      );
    }
}

export default SingleTask;
