import React, { Component } from "react";
import PropTypes from "prop-types";

import Icon from "./Icon.jsx";

class ArrowBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { icon } = this.props;

    return (
      <span className="arrowBox">
        <i className="arrowBox__icon _prev">
          <Icon name={icon} />
        </i>
        <i className="arrowBox__icon">
          <Icon name={icon} />
        </i>
      </span>
    );
  }
}

export default ArrowBox;

ArrowBox.propTypes = {
  icon: PropTypes.string,
};
