/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

import $ from './helpers/jquery-global';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import $ from 'jquery';
import MainLayout from './components/views/main-layout';
import Home from './components/views/parts/home';
import About from './components/views/parts/about';
import Repos from './components/views/parts/repos';
import Repo from './components/views/parts/repo';
// import NoMatch from './components/no-match';

window.jQuery = $;

// const Users = React.createClass({
//   render() {
//     return (
//       <div>
//         <h1>Users</h1>
//         <div className="master">
//           <ul>
//             {/* use Link to route around the app */}
//             {this.state.users.map(user => (
//               <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
//             ))}
//           </ul>
//         </div>
//         <div className="detail">
//           {this.props.children}
//         </div>
//       </div>
//     )
//   }
// })

// const User = React.createClass({
//   componentDidMount() {
//     this.setState({
//       // route components are rendered with useful information, like URL params 
//       user: findUserById(this.props.params.userId)
//     })
//   },

//   render() {
//     return (
//       <div>
//         <h2>{this.state.user.name}</h2>
//         {/* etc. */}
//       </div>
//     )
//   }
// });

// Declarative route configuration (could also load this config lazily 
// instead, all you really need is a single root route, you don't need to 
// colocate the entire config). 
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>

  // <Router history={browserHistory}>
  //   <Route path="/" component={App}>
  //     <Route path="about" component={About}/>
  //     <Route path="users" component={Users}>
  //       <Route path="/user/:userId" component={User}/>
  //     </Route>
  //     <Route path="*" component={NoMatch}/>
  //   </Route>
  // </Router>

), document.getElementById('root'));
