import React from 'react';
import PropTypes from 'prop-types';
import SingleTask from '../SingleTask/SingleTask';
import taskShape from '../../helpers/propz/taskShape';
import './Tasks.scss';
// import InvitationModal from '../InvitationModal/InvitationModal';

class Tasks extends React.Component {
    // state = {
    //   invitationModal: false,
    // }

    static propTypes = {
      tasks: PropTypes.arrayOf(taskShape),
      currentUser: PropTypes.object,
    }

    // toggleInvitationModal = () => {
    //   const { invitationModal } = this.state;
    //   this.setState({ invitationModal: !invitationModal });
    // }

    render() {
    //   const { invitationModal } = this.state;
      const { tasks, currentUser } = this.props;
      const singleTaskComponent = tasks.map(task => (
            <SingleTask
             task = {task}
             key = {task.id}
            />
      ));

    //   const checkLength = () => {
    //     if (tasks.length !== 0) {
    //       return (
    //         <button className="bttn-pill bttn-success text-center" onClick={this.toggleInvitationModal}>Send Invitations</button>
    //       );
    //     } return (
    //         <span></span>
    //     );
    //   };

      return (
        <div>
          <div>
            {singleTaskComponent}
          </div>
          {/* <div>{checkLength()}</div> */}
          {/* <InvitationModal
          invitationModal = {invitationModal}
          currentUser = {currentUser}
          toggleInvitationModal = {this.toggleInvitationModal}
          /> */}
        </div>
      );
    }
}

export default Tasks;
