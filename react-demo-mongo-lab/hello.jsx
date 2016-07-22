import React from 'react';

let Hello = React.createClass({
    render: function() {
        return (
            <div>Welcome, {this.props.name}</div>
        );
    }
});

export default Hello;