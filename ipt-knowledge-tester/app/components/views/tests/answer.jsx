import React from "react";
import getMarkdown from '../../../helpers/get-markdown';

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete() {
    let answerId = this.props.answerId;
    if (!answerId) {
      return;
    }
    // TODO: send test delete request to the server
    this.props.onAnswerDelete(answerId);
  }

  render() {

    return (
      <tr className="answer">
        <td className="answerText">
          <span dangerouslySetInnerHTML={ getMarkdown(this.props.children) } />
        </td>
        {this.props.showWeights ? (
          <td className="answerWeight">
            {this.props.weight}
          </td>
        ) : null }
        {this.props.isEdit ? (
          <td className="answerControls">
            <button onClick={this.handleDelete}>Delete</button>
          </td>
        ) : null }
      </tr>
    );
  }

}

Answer.propTypes = {
  answerId: React.PropTypes.string,
  children: React.PropTypes.string.isRequired,
  weight: React.PropTypes.number.isRequired,
  showWeights: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,
  onAnswerDelete: React.PropTypes.func
};

Answer.defaultProps = {
  weight: 0,
  showWeights: false,
  isEdit: false
};

export default Answer;
