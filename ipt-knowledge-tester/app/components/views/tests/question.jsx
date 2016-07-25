import React from "react";
import getMarkdown from '../../../helpers/get-markdown';
import Answer from './answer';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteQuestion() {
    let questionId = this.props.questionId;
    if (!questionId) {
      return;
    }
    // TODO: send answer delete request to the server
    this.props.onQuestionDelete(questionId);
  }

  render() {
    let answerNodes = this.props.answers.map((answer) => {
      return (
        <Answer key={answer.id} answerId={answer.id} weight={answer.weight}
          showWeights={this.props.showWeights} isEdit={this.props.isEdit}
          onQuestionDelete={this.props.onAnswerDelete}>
          {answer.text}
        </Answer>
      );
    });

    return (
      <div className="question">
        <p className="questionText">
          <span dangerouslySetInnerHTML={ getMarkdown(this.props.children) } />
        </p>
        <table className="answers row table table-bordered table-striped table-condensed">
          <tbody>
            {answerNodes}
          </tbody>
        </table>

        { this.props.isEdit ? (
          <div className="testControls">
            <button onClick={this.addAnswer}>Add Answer</button>
            <button onClick={this.editQuestion}>Edit Question</button>
            <button onClick={this.deleteQuestion}>Delete Question</button>
          </div>
        ) : null }
      </div>
    );
  }

}

Question.propTypes = {
  questionId: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
  hint: React.PropTypes.string,
  weight: React.PropTypes.number,
  answers: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      weight: React.PropTypes.number.isRequired,
    })
  ),
  showWeights: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,
  onQuestionDelete: React.PropTypes.func,
  onAnswerDelete: React.PropTypes.func
};

Question.defaultProps = {
  weight: 1,
  showWeights: false,
  isEdit: false
};

export default Question;
