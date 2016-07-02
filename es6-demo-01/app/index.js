import React from 'react';

import {MyComponent} from './component';

let instance = new MyComponent('Hello ECMAScript 6 World!');
document.body.appendChild(instance.getElement());

console.log('Webpack demo 01 loaded successfully.');