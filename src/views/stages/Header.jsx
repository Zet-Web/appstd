import React, { Component } from "react";
import { connect } from "react-redux";

import HeadPagenation from "../../components/HeadPagenation.jsx";
import setSpacesInText from "../../functions/setSpacesInText";
import HandlerAnimate from "../../classes/HandlerAnimate.js";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.parent = React.createRef();
  }

  pagenation = [
    {
      key: "",
      content: "Главная",
    },
    {
      key: "stages",
      content: "Этапы реализации",
      isCurrent: true,
    },
  ];

  back = [
    [
      {
        key: "ui-ux",
        type: "text",
        content: "UI/UX",
      },
      {
        key: "swift",
        type: "icon",
        content: "swift-icon.png",
      },
      {
        key: "ios",
        type: "text",
        content: "iOS",
      },
    ],
    [
      {
        key: "figma",
        type: "icon",
        content: "figma-icon.svg",
      },
      {
        key: "android",
        type: "text",
        content: "Android",
      },
      {
        key: "kotlin",
        type: "icon",
        content: "kotlin-icon.svg",
      },
    ],
    [
      {
        key: "back-end",
        type: "text",
        content: "Back-end",
      },
      {
        key: "postgresql",
        type: "icon",
        content: "postgresql-icon.png",
      },
      {
        key: "ii",
        type: "text",
        content: "ИИ",
      },
    ],
    [
      {
        key: "qa-qc",
        type: "text",
        content: "QA/QC",
      },
      {
        key: "api",
        type: "text",
        content: "API",
      },
      {
        key: "python",
        type: "icon",
        content: "python-icon.svg",
      },
    ],
  ];

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.handlerAnimateText = new HandlerAnimate({
      type: "text",
      classParent: ".textAnimate",
      parent: this.parent.current,
    });

    this.handlerAnimateText.init();
    this.handlerAnimateText.handler();
  }

  render() {
    const { device } = this.props;

    return (
      <div ref={this.parent} className="stagesHeader">
        <div className="stagesHeader__back">
          <div className="stagesHeader__backContent">
            {this.back.map((items, itemsKey) => (
              <div className="stagesHeader__backItems" key={itemsKey}>
                {items.map((item, key) => (
                  <div
                    className={`stagesHeader__backItem _${item.key} _${item.type}`}
                    key={key}
                  >
                    {item.type === "icon" ? (
                      <img
                        src={
                          require(`../../img/stages/${item.content}`).default
                            .src
                        }
                        alt=""
                        className="stagesHeader__backItemIcon"
                      />
                    ) : (
                      <p className="stagesHeader__backItemContent">
                        {item.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="stagesHeader__inner">
          <div className="stagesHeader__pagenation">
            <HeadPagenation items={this.pagenation} />
          </div>
          <div className="stagesHeader__content">
            <div className="stagesHeader__title">
              {device === "desktop" ? (
                <h1 className="title _mediumSizeTablet _tall">
                  <span className="title__elem">Этапы</span>{" "}
                  <i className="title__elem _icon title__icon _icon16">
                    <img
                      src={
                        require("../../img/emodzi/emodzi-16.png").default.src
                      }
                      alt=""
                      className="title__iconItem"
                    />
                  </i>
                  <br />
                  <span className="title__elem">
                    <b>реализации</b>
                  </span>
                </h1>
              ) : (
                <h1 className="title _mediumSizeTablet _tall">
                  <span className="title__elem">Этапы</span>{" "}
                  <i className="title__elem _icon title__icon _icon16">
                    <img
                      src={
                        require("../../img/emodzi/emodzi-16.png").default.src
                      }
                      alt=""
                      className="title__iconItem"
                    />
                  </i>{" "}
                  <span className="title__elem">
                    <b>реализации</b>
                  </span>
                </h1>
              )}
            </div>
            <p className="textAnimate stagesHeader__description _hard">
              Разработка мобильного приложения под ключ состоит из 5 основных
              этапов.
            </p>
            <p
              className="textAnimate stagesHeader__description"
              dangerouslySetInnerHTML={{
                __html:
                  setSpacesInText(`Каждый из которых, включает свой список работ, кол-во которых,
              зависит от необходимых функций и возможностей, логики и сторонних
              интеграций у предстоящего проекта`),
              }}
            ></p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    device: state.device,
  };
}

export default connect(mapStateToProps)(Header);
