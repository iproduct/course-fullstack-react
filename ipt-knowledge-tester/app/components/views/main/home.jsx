import React from 'react'

const Home = () => {
  return (
    <section id="home">
      <div className="jumbotron">
        <div className="container">
          <img src="/app/assets/img/test.png" className="pull-left" />
          <h1>IPT Knowledge Tester</h1>
        </div>
      </div>
      <p>
        IPT Knowledge Tester provides ability for instructors to define tests, and for  students to test their knowledge and abilities.
        In addition to that it allows users to register, and administrators to manage them.The system willbe developed as a Single Page
        Application (SPA) using React.js as front-end, and Node.js + hapi as backend technologies.
      </p>
      <p>Application provides following functionality: </p>
      <ul>
        <li>Anonymous users can view the information pages and try few sample tests without saving test results.</li>
        <li>Students can choose <em>tests</em> to complete – <em>test results</em> are saved automatically on test completion.</li>
        <li>Instructors can create <em>tests</em> and see the students' <em>test results</em>.</li>
        <li>Administrators can manage (create, edit user data and delete ) all <em>registered users</em>, as well as <em>tests</em> and <em>test results</em>.</li>
      </ul>
    </section>
  );
};


// Repos.propTypes = {
//   children: React.PropTypes.node
// }

export default Home;
