import React from 'react';
import $ from 'jquery';
import getMarkdown from '../../../helpers/get-markdown';
import Question from './question';


class Test extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Initialize state
    let state = {};

    // Determine working mode flags
    state.isControls = this.props.isControls ||
      (props.location && props.location.query && props.location.query.controls === 'true');
    state.isEdit = this.props.isEdit ||
      (props.location && props.location.query && props.location.query.edit === 'true');

    // Get or create test data
    if (props.test) {
      state.test = this.props.test;
    } else {
      // Default test initialization
      state.test = {
        id: '',
        title: '',
        description: '',
        difficulty: 'intermediate',
        author: '',
        license: 'CC BY-NC-SA',
        questions: []
      }

      // Read id from route param testId
      if (props.params && props.params.testId) {
        // state.test = data.find((test) => test.id === this.props.params.testId);

        // Load test by id
        context.testService.getTestById(this.props.params.testId).then((test) => {
          let newState = this.state;
          newState.test = test;
          if (newState.isEdit) {
            newState.oldTest = $.extend(true, {}, test); //needed in edit mode only for reset
          }
          this.setState(newState);
        });
      }
    }

    if (state.isEdit) {
      state.oldTest = $.extend(true, {}, state.test);
    }

    this.state = state;

    // Bind methods to this
    this.saveChanges = this.saveChanges.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.editTest = this.editTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);
  }

  // Class methods
  resetChanges() {
    this.setState({ test: $.extend(true, {}, this.state.oldTest) });
  }

  saveChanges() {
    this.setState({ oldTest: $.extend(true, {}, this.state.test) });
    if (this.state.test.id) { // edit test mode
      this.context.testService.editTest(this.state.test).then(() => {
        //return back to tests collection
        this.context.router.push({ pathname: `/tests`, query: { controls: true } });
      });
    } else {  // add new test mode
      this.context.testService.addNewTest(this.state.test).then(() => {
        //return back to tests collection
        this.context.router.push({ pathname: `/tests`, query: { controls: true } });
      });
    }
  }

  handleTextChange(e) {
    let test = this.state.test;
    test[e.target.name] = e.target.value;
    this.setState({ test: test });
  }

  editTest() {
    const path = { pathname: `/test/${this.state.test.id}`, query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  deleteTest() {
    if (this.state.test.id) {
      this.context.testService.deleteTest(this.state.test.id).then((deletedTest) => {
        if(this.props.onTestDelete) this.props.onTestDelete(deletedTest.id);  // call parent's callback
        this.context.router.push({ pathname: `/tests`, query: { controls: true } }); //return back to tests collection
      });
    }
  }

  render() {
    let isControls = this.state.isControls;
    let isEdit = this.state.isEdit;

    let questionNodes = this.state.test.questions.map((question) => {
      return (
        <li key={question.id}>
          <Question questionId={question.id}
            hint={question.hint} difficulty={question.difficulty}
            weight={question.weight} answers={question.answers}
            showWeights={false} showAnswers={false} isControls={this.state.isControls}
            onQuestionDelete={this.props.onQuestionDelete}>
            {question.text}
          </Question>
        </li>
      );
    });

    return (
      <div className="test">
        { isEdit ? (
          <h2>{!this.state.test.id ? "Add New" : "Edit"} Test</h2>
        ) : null}
        <h3 className="testTitle">
          { (isEdit) ? (
            <input type="text" name="title" placeholder="Name the test ..." className="form-control"
              value={this.state.test.title} onChange={this.handleTextChange} />
          ) : (
              <span>{this.state.test.title}</span>
            ) }
        </h3>
        <div className="row">
          <table className="metadata table table-bordered table-striped col-xs-12 col-md-6 col-lg-4">
            <tbody>
              <tr>
                <td>Description</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="description" placeholder="Describe the test ..." className="form-control"
                      value={this.state.test.description} onChange={this.handleTextChange} />
                  ) :
                    (<span dangerouslySetInnerHTML={getMarkdown(this.state.test.description) } />
                    ) }
                </td>
              </tr>
              { (!isEdit) ? (
                <tr>
                  <td>Questions #</td>
                  <td>{this.state.test.questions.length}</td>
                </tr>
              ) : null }
              <tr>
                <td>Difficulty</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="difficulty" placeholder="Test difficulty ..." className="form-control"
                      value={this.state.test.difficulty} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.test.difficulty}</span>
                    ) }
                </td>
              </tr>
              <tr>
                <td>Author</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="author" placeholder="Test author ..." className="form-control"
                      value={this.state.test.author} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.test.author}</span>
                    ) }
                </td>
              </tr>
              <tr>
                <td>License</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="license" placeholder="Test author ..." className="form-control"
                      value={this.state.test.license} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.test.license}</span>
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
              <button type="button" className="btn btn-success" onClick={this.addQuestion}>Add Question</button>
            </div>
          ) : (
              <div className="test-controls">
                <button type="button" className="btn btn-warning" onClick={this.editTest}>Edit Test</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteTest}>Delete Test</button>
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
    ).isRequired
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
