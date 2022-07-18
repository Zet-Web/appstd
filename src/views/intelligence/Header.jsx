import React, { Component } from "react";

import Header from "../../components/case/Header.jsx";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  header = {
    key: "intelligence",
    back: "item-header-intelligence.png",
    title:
      "<span class='title__elem'>Разработка&nbsp;системы</span> <span class='title__elem'><b>с искусственным</b></span> <span class='title__elem'><b>интеллектом (ИИ)</b></span>",
    description:
      "Эффективное решение задачи с помощью моделей машинного&nbsp;обучения (ML)",
    items: [
      {
        key: "",
        content: "Главная",
      },
      {
        key: "marketplace",
        content: "Искусственный интеллект",
        isCurrent: true,
      },
    ],
  };

  render() {
    const { headers } = this.props;

    return <Header model={this.header} headers={headers} />;
  }
}

export default View;
