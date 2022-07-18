import React, { Component } from "react";

import CustomeLink from "../../components/CustomeLink";
import HandlerAnimate from "../../classes/HandlerAnimate";
import LazyImage from "../../components/LazyImage";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.parent = React.createRef();
  }

  icons = [
    [{ icon: "icon-zanimator.png" }],
    [{ icon: "icon-pizza.png" }, { icon: "icon-aParty.svg" }],
    [
      { icon: "icon-smyslografia.svg" },
      { icon: "icon-plonq.svg" },
      { icon: "icon-mercada.svg" },
    ],
    [
      { icon: "icon-youNell.svg" },
      { icon: "icon-inClik.svg" },
      { icon: "icon-identer.svg" },
      { icon: "icon-akva.png" },
    ],
    [
      { icon: "icon-moiDom.png" },
      { icon: "icon-lex.svg" },
      { icon: "icon-rjd.png" },
      { icon: "icon-weGo.png" },
      { icon: "icon-autoSpa.svg" },
    ],
    [
      { icon: "icon-ponq.svg" },
      { icon: "icon-roll.png" },
      { icon: "icon-ibibook.png" },
      { icon: "icon-taxi.png" },
      { icon: "icon-eatRepeat.png" },
    ],
    [
      { icon: "icon-takeJet.svg" },
      { icon: "icon-apps.svg" },
      { icon: "icon-merod.svg" },
      { icon: "icon-night.png" },
    ],
    [
      { icon: "icon-nikolaevPizza.png" },
      { icon: "icon-chykotka.png" },
      { icon: "icon-dener.svg" },
    ],
    [{ icon: "icon-suchi.png" }],
    [{ icon: "icon-bodyHeal.svg" }],
  ];

  links = [
    {
      key: "intelligence",
      content: "Искусственный Интеллект",
    },
    {
      key: "marketplace",
      content: "Маркетплейсы",
    },

    {
      key: "onlineshop",
      content: "Онлайн-магазины",
    },
  ];

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    setTimeout(() => {
      this.handlerAnimate.handler();
    }, 200);
  }

  render() {
    return (
      <div ref={this.parent} className="indexHeader">
        <div className="indexHeader__inner">
          <div className="indexHeader__back">
            {this.icons.map((col, key) => (
              <div className="indexHeader__backIcons" key={key}>
                {col.map((item, keyIcon) => (
                  <div className="indexHeader__backIcon" key={keyIcon}>
                    <LazyImage
                      src={
                        require(`../../img/projects/${item.icon}`).default.src
                      }
                      className="indexHeader__backIconItem"
                    />
                    {/* <img
                      src={
                        require(`../../img/projects/${item.icon}`).default.src
                      }
                      alt=""
                      className="indexHeader__backIconItem"
                    /> */}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="indexHeader__content">
            <div className="indexHeader__title">
              <h1 className="title _tall _large">
                <span className="title__elem">Создаем</span>
                <i className="title__elem _icon title__icon _icon1">
                  <img
                    src={require("../../img/emodzi/emodzi-1.png").default.src}
                    alt=""
                    className="title__iconItem"
                  />
                </i>{" "}
                <span className="title__elem">
                  <b>Дизайн</b>
                </span>{" "}
                <span className="title__elem">
                  <b>&</b>
                </span>{" "}
                <span className="title__elem">Разрабатываем</span>{" "}
                <i className="title__elem _icon title__icon _icon2">
                  <img
                    src={require("../../img/emodzi/emodzi-2.png").default.src}
                    alt=""
                    className="title__iconItem"
                  />
                </i>{" "}
                <span className="title__elem">
                  <b>Мобильные</b>
                </span>{" "}
                <span className="title__elem">
                  <b>приложения</b>
                </span>
              </h1>
            </div>
            <div className="indexHeader__links">
              {this.links.map((link, key) => (
                <CustomeLink
                  href={`/${link.key}`}
                  key={key}
                  classname="indexHeader__link"
                >
                  {link.content}.
                </CustomeLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
