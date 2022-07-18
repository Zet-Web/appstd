import React, { Component } from "react";
import { connect } from "react-redux";

import getOffsetPosition from "../functions/getOffsetPosition";

import ArrowBox from "../components/ArrowBox.jsx";
import handlerMenu from "../functions/handlerMenu.js";
import CustomeLink from "../components/CustomeLink.jsx";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon";
import scrollTo from "../functions/scrollTo";
import { dispatcher } from "../redux/redux";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderSocials = this.renderSocials.bind(this);
  }

  socials = [
    {
      key: "tg",
      link: "https://t.me/iBorshchov",
    },
    {
      key: "wa",
      link: "https://wa.me/+79185659664",
    },
  ];

  nav = [
    {
      content: "Портфолио",
      key: "portfolio",
    },
    {
      content: "О студии",
      key: "about",
    },
    {
      content: "Контакты",
      key: "contacts",
    },
  ];

  renderSocials(className) {
    return (
      <div className={`topBar__socials ${className || ``}`}>
        {this.socials.map((social, key) => (
          <a
            href={social.link}
            className={`topBar__social _${social.key}`}
            key={key}
            target="_blank"
          >
            <i className="topBar__socialIcon"></i>
          </a>
        ))}
      </div>
    );
  }

  render() {
    const { device, stateMenu } = this.props;

    return (
      <div className={`topBar ${stateMenu === 1 ? "_showMenu" : ""}`}>
        <div className="topBar__inner">
          <div className="topBar__item _info">
            <div
              className="topBar__icon"
              onClick={() => {
                handlerMenu();
              }}
            >
              <i className="topBar__iconItem"></i>
            </div>

            <CustomeLink href={`/`} classname="topBar__logo">
              <i className="topBar__logoInner">
                <Icon name="logo" />
              </i>
            </CustomeLink>
            {this.renderSocials("_elemMobile")}
            <div
              className="topBar__button"
              onClick={() => {
                const contacts = document.querySelector(".contacts");
                if (contacts) {
                  const top = getOffsetPosition(contacts)[1];

                  if (process.browser) {
                    dispatcher({ type: "isScrollToForm", data: true });
                    document.dispatchEvent(new CustomEvent("scrollToForm"));
                    scrollTo(top, 1000);
                    setTimeout(() => {
                      dispatcher({ type: "isScrollToForm", data: false });
                    }, 1000);
                  }
                }
              }}
            >
              <Button classes="_main" content="Заказать" />
            </div>
          </div>
          {device === "desktop" && (
            <div className="topBar__item _actions">
              {this.renderSocials()}
              <div className="topBar__nav">
                <nav className="topBar__navInner">
                  {this.nav.map((item, key) => (
                    <li className="topBar__navItem" key={key}>
                      <CustomeLink href={`/${item.key}`}>
                        <span className="topBar__navLink">
                          {item.content}
                          {item.key === "contacts" && (
                            <span className="topBar__navIcon">
                              <ArrowBox icon="arrow-right-short" />
                            </span>
                          )}
                        </span>
                      </CustomeLink>
                    </li>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    device: state.device,
    stateMenu: state.stateMenu,
  };
}

export default connect(mapStateToProps)(TopBar);
