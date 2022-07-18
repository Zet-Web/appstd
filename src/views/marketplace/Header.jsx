import React, { Component } from "react";

import Header from "../../components/case/Header.jsx";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  header = {
    key: "marketplace",
    back: "item-header-marketplace.png",
    title:
      "<span class='title__elem'>Разработка</span> <br/><span class='title__elem'>крутого</span> <span class='title__elem'><b>маркетплейса</b></span>",
    description:
      "Площадка, где одни пользователи продают, другие&nbsp;покупают, а вы зарабатываете",
    items: [
      {
        key: "",
        content: "Главная",
      },
      {
        key: "marketplace",
        content: "Маркетплейс",
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
