'use strict';

import React from 'react';
// import { browserHistory } from 'react-router';
import NavLink from '../../navigation/nav-link';

const Navigation = ({children}, context) => {

  function handleSearch(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/repos/${userName}/${repo}`;
    console.log(path);
    // navigate programmatically
    // browserHistory.push(path);
    context.router.push(path);
  }

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <NavLink to="/" onlyActiveOnIndex={true} className="navbar-brand"><img alt="Brand" src="/app/assets/img/ipt-logo.png" /></NavLink>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><NavLink to="/about">About</NavLink></li>

            <li className="dropdown">
              <NavLink to="/repos" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Repos <span className="caret"></span></NavLink>
              <ul className="dropdown-menu">
                <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-left" role="search" onSubmit={handleSearch}>
            <div className="form-group">
              <input type="text" placeholder="userName" className="form-control" /> / {' '}
              <input type="text" placeholder="repo" className="form-control" />{' '}
            </div>
            <button type="submit" className="btn btn-default">Go</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

}

Navigation.propTypes = {
  children: React.PropTypes.node
}

// ask for `router` from context
Navigation.contextTypes = {
  router: React.PropTypes.object
};

export default Navigation;