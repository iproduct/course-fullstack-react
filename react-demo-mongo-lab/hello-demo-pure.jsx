'use strict';
import React from 'react';

export const HelloDemoPure = 
    (props) => <h1>Hello, {props.name}</h1>;

HelloDemoPure.propTypes = {
    name: React.PropTypes.string
}