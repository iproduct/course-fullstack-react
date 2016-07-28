# IPT Knowledge Tester v0.1.0

IPT Knowledge Tester provides ability for instructors to define tests, and for students to test their knowledge and abilities. 
In addition to that it allows users to register, and administrators to manage them.The system willbe developed as a Single Page Application (SPA) 
using *React.js* and *react-router* as front-end, and *Node.js* + *hapi* + *MongoDB* as backend technologies.


## Runnung The Demo
In order to start the project instal latest *Node.js* and from console run:
```
npm install
npm start
``` 

## Project Decription and Main Components
Application aims to provide following functionality:

* *Anonymous users* can view the information pages and try few sample tests without saving test results.
* *Students* can choose tests to complete – test results are saved automatically on test completion.
* *Instructors* can create tests and see the students' test results.
* *Administrators* can manage (create, edit user data and delete) all registered users, as well as tests and test results.

This initial version of the project demonstartes only basic routing capabilities and initial test-list and test rendering using react.js and react router.
See next versions of the project for further implementation of the application features.

JavaScript (ECMAScript 6) client part is available in */app* folder. It uses *Webpack* and *webpack-dev-server* with HMR (Hot Module Replacement).
Configuration is specified in webpack.config.js. 

Client side application is developed as *Singe Page App (SPA)*. The app entry point is *index.js*, which imports *react-router* configuration
specified in *main-router.jsx*. The top-level application component is *ipt-knowledge-tester.jsx* (React JSX + ES6).

