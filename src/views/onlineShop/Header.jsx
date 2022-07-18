import React, { Component } from "react";

import Header from "../../components/case/Header.jsx";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  header = {
    key: "onlineShop",
    back: "item-header-onlineShop.png",
    title:
      "<span class='title__elem'>Разработка</span> <br/><span class='title__elem'>лучшего</span> <span class='title__elem'><b>онлайн-магазина</b></span>",
    description: "Для продажи товаров или услуг с программой лояльности",
    items: [
      {
        key: "",
        content: "Главная",
      },
      {
        key: "marketplace",
        content: "Онлайн-магазин",
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
