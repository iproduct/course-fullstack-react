'use strict';

import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from 'react-router';
import KnowledgeTester from './views/knowledge-tester';
import About from './views/about';
import Repos from './views/repos';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={KnowledgeTester}>
            <Route path="/about" component={About} />
            <Route path="/repos" component={Repos} />
        </Route>
    </Router>,
    document.getElementById('root')
);
