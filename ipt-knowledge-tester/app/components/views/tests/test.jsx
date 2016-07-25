import React from 'react';
import $ from 'jquery';
import getMarkdown from '../../../helpers/get-markdown';
import Question from './question';
import { data } from '../../../fake-data/tests-data';


class Test extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    let state = {};
    if (props.test) {
      state.test = this.props.test;
    } else if (props.params && props.params.testId) {
      state.test = data.find((test) => test.id === this.props.params.testId);
    } else {
      state.test = {
        id: '',
        title: '',
        description: '',
        difficulty: 'intermediate',
        author: '',
        license: 'CC BY-NC-SA',
        questions: []
      }
    }

    state.newTest = $.extend(true, {}, state.test);
    state.isControls = this.props.isControls ||
      (props.location && props.location.query && props.location.query.controls === 'true');
    state.isEdit = this.props.isEdit ||
      (props.location && props.location.query && props.location.query.edit === 'true');
    this.state = state;

    // Bind methods to this
    this.saveChanges = this.saveChanges.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  resetChanges() {
    this.setState({ newTest: $.extend(true, {}, this.state.test) });
  }

  saveChanges() {
    this.setState({ test: $.extend(true, {}, this.state.newTest) });
    this.context.testService.postTest(this.state.newTest);
  }

  handleTextChange(e) {
    let newTest = this.state.newTest;
    newTest[e.target.name] = e.target.value;
    this.setState({ newTest: newTest });
  }

  handleDelete() {
    let testId = this.state.newTest.testId;
    if (!testId) {
      return;
    }
    // TODO: send test delete request to the server
    this.props.onTestDelete(testId);
  }

  render() {
    let isControls = this.state.isControls;
    let isEdit = this.state.isEdit;

    let questionNodes = [];
    if(this.state.newTest.questions) {
      questionNodes = this.state.newTest.questions.map((question) => {
        return (
          <li key={question.id}>
            <Question questionId={question.id}
              hint={question.hint} difficulty={question.difficulty}
              weight={question.weight} answers={question.answers}
              showWeights={false} showAnswers={false} isControls={this.props.isControls}
              onQuestionDelete={this.props.onQuestionDelete}>
              {question.text}
            </Question>
          </li>
        );
      });
    }

    return (
      <div className="test">
        { isControls ? (
          <h2>{!this.state.newTest.id ? "Add New" : "Edit"} Test</h2>
        ) : null}
        <h3 className="testTitle">
          { (isControls) ? (
            <input type="text" name="title" placeholder="Name the test ..." className="form-control"
              value={this.state.newTest.title} onChange={this.handleTextChange} />
          ) : (
              <span>{this.state.newTest.title}</span>
            ) }
        </h3>
        <div className="row">
          <table className="metadata table table-bordered table-striped col-xs-12 col-md-6 col-lg-4">
            <tbody>
              <tr>
                <td>Description</td>
                <td>
                  { (isControls) ? (
                    <input type="text" name="description" placeholder="Describe the test ..." className="form-control"
                      value={this.state.newTest.description} onChange={this.handleTextChange} />
                  ) :
                    (<span dangerouslySetInnerHTML={getMarkdown(this.state.newTest.description) } />
                    ) }
                </td>
              </tr>
              { (!isControls) ? (
                <tr>
                  <td>Questions #</td>
                  <td>{this.state.newTest.questions.length}</td>
                </tr>
              ) : null }
              <tr>
                <td>Difficulty</td>
                <td>
                  { (isControls) ? (
                    <input type="text" name="difficulty" placeholder="Test difficulty ..." className="form-control"
                      value={this.state.newTest.difficulty} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.newTest.difficulty}</span>
                    ) }
                </td>
              </tr>
              <tr>
                <td>Author</td>
                <td>
                  { (isControls) ? (
                    <input type="text" name="author" placeholder="Test author ..." className="form-control"
                      value={this.state.newTest.author} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.newTest.author}</span>
                    ) }
                </td>
              </tr>
              <tr>
                <td>License</td>
                <td>
                  { (isControls) ? (
                    <input type="text" name="license" placeholder="Test author ..." className="form-control"
                      value={this.state.newTest.license} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.newTest.license}</span>
                    ) }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ol className="testData">
          {questionNodes}
        </ol>

        { isControls ?
          (isEdit ? (
            <div className="test-controls">
              <button type="button" className="btn btn-primary" onClick={this.saveChanges}>Save Changes</button>
              <button type="button" className="btn btn-warning" onClick={this.resetChanges}>Reset Changes</button>
              <button type="button" className="btn btn-success" onClick={this.handleDelete}>Add Question</button>
            </div>
          ) : (
              <div className="test-controls">
                <button type="button" className="btn btn-warning" onClick={this.handleDelete}>Edit Test</button>
                <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete Test</button>
              </div>
            )
          ) : null
        }
      </div>
    );
  }

}

Test.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  test: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
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
  }),
  isControls: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,
  onTestDelete: React.PropTypes.func,
  onQuestionDelete: React.PropTypes.func,
  onAnswerDelete: React.PropTypes.func
};

Test.contextTypes = {
  testService: React.PropTypes.object,
  router: React.PropTypes.object
};

Test.defaultProps = {
  difficulty: 'intermediate',
  license: 'CC BY-NC-SA',
  questions: 0,
};


export default Test;
