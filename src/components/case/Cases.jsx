import React, { Component } from "react";

import Case from "../Case.jsx";

class Cases extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { elements, model } = this.props;

    return (
      <div className="caseCases">
        <div className="caseCases__inner">
          <div className="caseCases__items">
            {model.cases.map((item, key) => (
              <div className="caseCases__item" key={key}>
                <Case elements={elements} model={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Cases;
