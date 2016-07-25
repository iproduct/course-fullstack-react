import React from 'react'

export default React.createClass({
  render() {
    return (
      <main>
        <h2>About: IPT Knowledge Tester</h2>
        <p>Copyright &copy; 2016 by 
        <a href="http://iproduct.org/en/" target="_blank"> IPT - Intellectual Products & Technologies Ltd.</a>. All rights reserved.
        </p>
        <section>
          <p>
            IPT Knowledge Tester provides ability for instructors to define tests, and for  students to test their knowledge and abilities.
            In addition to that it allows users to register, and administrators to manage them. The system is implemented as a Single Page 
            Application (SPA) using <em>React.js</em> as front-end, and <em>Node.js</em> and <em>Hapi.js</em> as backend technologies.
          </p>
        </section>
    </main>
  );
        }
});
