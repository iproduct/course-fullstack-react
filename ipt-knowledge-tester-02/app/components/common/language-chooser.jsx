'use strict';
import React from "react";

class LanguageChooser extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.switchLocale = this.switchLocale.bind(this);
  }

  switchLocale(e) {
    this.context.localeService.setLocale(e.target.value);
  }

  render() {
    return (
      <p className="form-inline">
        <span>Switch Locale:</span>

        <select className="form-control" defaultValue={this.context.localeService.getLocale()} onChange={this.switchLocale}>
          <option>en</option>
          <option>bg</option>
        </select>
      </p>
    );
  }
}

LanguageChooser.contextTypes = {
  localeService: React.PropTypes.object
};

export default LanguageChooser;