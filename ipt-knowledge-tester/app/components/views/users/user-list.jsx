import React from 'react';
import User from './user';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import { data } from '../../../fake-data/users-data';

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { users: [] }
    this.addUser = this.addUser.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }


  addUser() {
    const path = { pathname: '/user', query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  handleUserDeleted(deletedUserId) {
    // remove deleted user
    let newUsers = this.state.users.filter((user) => {
      return (user.id !== deletedUserId);
    });
    this.setState({ users: newUsers });
  }

  componentDidMount() {
    this.context.userService.getUsers().then((users) => {
      this.setState({ users: users });
    });
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    let isControls = this.props.location.query.controls === 'true';

    let userNodes = this.state.users.map((user) => {
      console.log(user);
      return (
        <User user={user} key={user.id}
          isControls={isControls} isDetails={false}
          onUserDelete={this.handleUserDeleted} >
        </User>
      );
    });

    return (
      <section className="users">
        <h2>Users Available</h2>
        { true ? (
          <button type="button" className="btn btn-primary" onClick={this.addUser}>Add New User</button>
        ) : null
        }
        <div className="userList">
          <ReactCSSTransitionGroup transitionName="users" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {userNodes}
          </ReactCSSTransitionGroup>
        </div>
      </section>
    );
  }
}


UserList.propTypes = {
  users: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      email: React.PropTypes.string.isRequired,
      firstName: React.PropTypes.string.isRequired,
      lastName: React.PropTypes.string.isRequired,
      password: React.PropTypes.string.isRequired,
      role: React.PropTypes.oneOf(['student', 'instructor', 'admin']).isRequired
    })
  ),
  location: React.PropTypes.object,
  onUserDelete: React.PropTypes.func
};

UserList.contextTypes = {
  userService: React.PropTypes.object,
  router: React.PropTypes.object
};

UserList.defaultProps = {
  isControls: true
};

export default UserList;