import React from "react";

export const Hello = React.createClass({
 propTypes: {
    name: React.PropTypes.string
  },
  render: function() {
   return (
     <div>
         Hello, {this.props.name}!
     </div>
   );
 },
});