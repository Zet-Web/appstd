import React, { Component } from "react";

import Projects from "../../components/case/Projects.jsx";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Projects category="ai" />;
  }
}

export default View;
