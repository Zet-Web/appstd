import React, { Component } from "react";

import Icon from "./Icon.jsx";
import scrollTo from "../functions/scrollTo.js";
import { dispatcher } from "../redux/redux.js";

class ButtonUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="buttonUp"
        onClick={() => {
          if (process.browser) {
            dispatcher({ type: "isUp", data: true });
            document.dispatchEvent(new CustomEvent("scrollUp"));
            scrollTo(0, 1000);
            setTimeout(() => {
              dispatcher({ type: "isUp", data: false });
            }, 1000);
          }
        }}
      >
        <i className="buttonUp__icon">
          <Icon name="arrow-up-long" />
        </i>
      </div>
    );
  }
}

export default ButtonUp;
