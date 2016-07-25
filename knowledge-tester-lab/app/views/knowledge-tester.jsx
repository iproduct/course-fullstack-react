'use strict';

import React from 'react';
import { Link } from 'react-router';

const KnowledgeTester = (props) => {
    return (
        <div>
            <h1>Knowledge Tester Demo</h1>
            <ul role="nav">
                <li><Link to="/about" activeStyle={{ color: 'red' }} >About</Link></li>
                <li><Link to="/repos" activeStyle={{ color: 'red' }} >Repos</Link></li>
            </ul>
            {props.children}
        </div>
    )
};

KnowledgeTester.propTypes = {
    children: React.PropTypes.node
}

export default KnowledgeTester;
