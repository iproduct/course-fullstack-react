import React from 'react';
import Test from './test';
// import { data } from '../../../fake-data/tests-data';

class TestList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tests: [] }
    this.addTest = this.addTest.bind(this);
    this.handleTestDeleted = this.handleTestDeleted.bind(this);
  }


  addTest() {
    const path = { pathname: '/test', query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  handleTestDeleted(deletedTestId) {
    // remove deleted test
    let newTests = this.state.tests.filter((test) => {
      return (test.id !== deletedTestId);
    });
    this.setState({ tests: newTests });
  }

  componentDidMount() {
    this.context.testService.getTests().then((tests) => {
      this.setState({ tests: tests });
    });
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    let isControls = this.props.location.query.controls === 'true';

    let testNodes = this.state.tests.map((test) => {
      console.log(test);
      return (
        <Test test={test} key={test.id}
          isControls={isControls} isDetails={false}
          onTestDelete={this.handleTestDeleted} >
        </Test>
      );
    });

    return (
      <section className="tests">
        <h2>Tests Available</h2>
        { true ? (
          <button type="button" className="btn btn-primary" onClick={this.addTest}>Add New Test</button>
        ) : null
        }
        <div className="testList">
          {testNodes}
        </div>
      </section>
    );
  }
}


TestList.propTypes = {
  tests: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      difficulty: React.PropTypes.oneOf(['beginner', 'intermediate', 'expert']).isRequired,
      author: React.PropTypes.string,
      license: React.PropTypes.oneOf(['CC0', 'CC BY', 'CC BY-ND', 'CC BY-NC', 'CC BY-NC-SA', 'CC BY-NC-ND', 'Apache 2.0', 'EPL', 'GPL']).isRequired,
      questions: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.string,
          text: React.PropTypes.string.isRequired,
          hint: React.PropTypes.string,
          weight: React.PropTypes.number.isRequired,
          answers: React.PropTypes.arrayOf(
            React.PropTypes.shape({
              id: React.PropTypes.string,
              text: React.PropTypes.string.isRequired,
              weight: React.PropTypes.number.isRequired,
            })
          )
        })
      )
    })),
  location: React.PropTypes.object,
  onTestDelete: React.PropTypes.func
};

TestList.contextTypes = {
  testService: React.PropTypes.object,
  router: React.PropTypes.object
};

TestList.defaultProps = {
  isControls: true
};


export default TestList;