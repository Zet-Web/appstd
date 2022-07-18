import React, { Component } from "react";
import { connect } from "react-redux";

import handlerMenu from "../functions/handlerMenu";
import CustomeLink from "../components/CustomeLink";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      heightContent: 0,
      isLoad: false,
      isHide: true,
    };

    this.handlerItem = this.handlerItem.bind(this);
    this.setHeightContent = this.setHeightContent.bind(this);

    this.parent = React.createRef();
  }

  nav = [
    {
      key: "index",
      href: "",
      content: "Главная",
      color: "#D2F4E4",
    },
    {
      key: "onlineshop",
      href: "onlineshop",
      content: "Онлайн-магазин",
      color: "#D7EFFE",
    },
    {
      key: "marketplace",
      href: "marketplace",
      content: "Маркетплейс",
      color: "#EEF7D1",
    },
    {
      key: "intelligence",
      href: "intelligence",
      content: "Искусственный <br/>Интеллект",
      color: "#EAEAF6",
    },
    {
      key: "portfolio",
      href: "portfolio",
      content: "Портфолио",
      color: "#BFDFE6",
    },
    {
      key: "stages",
      href: "stages",
      content: "Этапы <br class='_elemMobile' />реализации",
      color: "#D1D4E4",
    },
    {
      key: "about",
      href: "about",
      content: "О студии",
      color: "#DAE9F3",
    },
    {
      key: "contacts",
      href: "contacts",
      content: "Контакты",
      color: "#FAECFC",
    },
  ];

  handlerItem(activeKey = null) {
    this.setState((state) => {
      const newState = { ...state };

      newState.activeKey = activeKey;

      return newState;
    });
  }

  setHeightContent() {
    const { device } = this.props;

    if (process.browser) {
      this.setState((state) => {
        const newState = { ...state };

        newState.heightContent =
          document.documentElement.clientHeight -
          (device === "mobile"
            ? document.querySelector(".topBar").offsetHeight
            : 0);

        return newState;
      });
    }
  }

  componentDidMount() {
    this.setHeightContent();

    setTimeout(() => {
      this.setState(
        (state) => {
          const newState = { ...state };

          newState.isHide = false;

          return newState;
        },
        () => {
          setTimeout(() => {
            this.setState((state) => {
              const newState = { ...state };

              newState.isLoad = true;

              return newState;
            });
          }, 700);
        }
      );
    }, 20);

    if (process.browser) {
      window.addEventListener("resize", this.setHeightContent);
    }
  }

  componentWillUnmount() {
    if (process.browser) {
      window.removeEventListener("resize", this.setHeightContent);
    }
  }

  render() {
    const { activeKey, heightContent, isLoad, isHide } = this.state;

    return (
      <div
        ref={this.parent}
        className={`menu ${(activeKey && "_active") || ""} ${
          isLoad === false ? "_notLoad" : ""
        } ${isHide === true ? "_hide" : ""}`}
      >
        <div className="menu__gradient"></div>
        <div
          className={`menu__back ${(activeKey && "_show") || ""}`}
          style={{
            background: this.nav.find((back) => back.key === activeKey)?.color,
          }}
        ></div>
        <div className="menu__content">
          <div className="menu__items">
            {this.nav.map((item, key) => (
              <CustomeLink
                href={`/${item.href}`}
                key={key}
                callback={() => {
                  handlerMenu("hide");
                }}
              >
                <span
                  className={`menu__item _${item.key} ${
                    activeKey === item.key ? "_current" : ""
                  }`}
                  onMouseEnter={() => {
                    this.handlerItem(item.key);
                  }}
                  onMouseLeave={() => {
                    this.handlerItem();
                  }}
                >
                  <span
                    className="menu__itemContent"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></span>
                </span>
              </CustomeLink>
            ))}
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

export default connect(mapStateToProps)(Menu);
