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

const $ = require('jquery');
window.jQuery = $;
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useQueries } from 'history';
import KnowledgeTester from './components/views/knowledge-tester';
import Home from './components/views/main/home';
import About from './components/views/main/about';
import Repos from './components/views/main/repos';
import Repo from './components/views/main/repo';
import TestList from './components/views/test/test-list';
 
const appHistory = useQueries(useRouterHistory(createBrowserHistory))();

ReactDOM.render((
  <Router history={appHistory}>
    <Route path="/" component={KnowledgeTester}>
      <IndexRoute component={Home}/>
      <Route path="/tests" component={TestList} />
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>

), document.getElementById('root'));
