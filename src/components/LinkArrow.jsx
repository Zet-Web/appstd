import React, { Component } from "react";

import ArrowBox from "./ArrowBox.jsx";
import CustomeLink from "./CustomeLink.jsx";

class LinkArrow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { content, href, callback } = this.props;

    return (
      <CustomeLink href={href} classname="linkArrow" callback={callback}>
        {content}
        <span className="linkArrow__icon">
          <ArrowBox icon="arrow-right-short" />
        </span>
      </CustomeLink>
    );
  }
}

export default LinkArrow;
