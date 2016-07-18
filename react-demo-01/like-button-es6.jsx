'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class LikeButton extends React.Component {
    constructor() {
        super();
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ liked: !this.state.liked });
    }
    render() {
        const text = this.state.liked ? 'like' : 'haven\'t liked';
        const divStyle = {
            color: 'white',
            background: '#8899ff',
            width: 300,
            padding: 20,
            textAlign: 'center',
            fontFamily: 'Arial'
        };

        return (
            <div style={divStyle} onClick={this.handleClick}>
                You {text} this.Click to toggle.
            </div>
        );
    }
}

ReactDOM.render(
    <LikeButton />,
    document.getElementById('app')
);