import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../../components/Form.jsx";
import HandlerAnimate from "../../classes/HandlerAnimate.js";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      isLoad: false,
    };

    this.setLoad = this.setLoad.bind(this);

    this.parent = React.createRef();
  }

  socials = [
    {
      key: "tg",
      name: "Telegram",
      icon: "tg-icon.svg",
      link: "https://t.me/iBorshchov",
    },
    {
      key: "wa",
      name: "WhatsApp",
      icon: "wa-icon.svg",
      link: "https://wa.me/+79185659664",
    },
    {
      key: "inst",
      name: "Instagram",
      icon: "inst-icon.svg",
      link: "https://www.instagram.com/appsstudio_mobile/",
    },
    {
      key: "be",
      name: "Behance",
      icon: "be-icon.svg",
      link: "https://www.behance.net/jobs1217",
    },
  ];

  setLoad(isLoad) {
    this.setState((state) => {
      const newState = { ...state };

      newState.isLoad = isLoad;

      return newState;
    });
  }

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();
  }

  render() {
    const { isLoad } = this.state;
    const { device } = this.props;

    return (
      <div
        ref={this.parent}
        className={`contacts ${isLoad === true ? "_isLoad" : ""}`}
      >
        <div className="contacts__inner">
          <div className="contacts__items">
            {/* <div className="contacts__loader"></div> */}
            <div className="contacts__item _info">
              <div className="contacts__title">
                <h4 className="title _mediumSize">
                  <span className="title__elem">Контакты</span>

                  <i className="title__elem _icon title__icon _icon8">
                    <img
                      src={require("../../img/emodzi/emodzi-8.png").default.src}
                      alt=""
                      className="title__iconItem"
                    />
                  </i>
                </h4>
              </div>
              <div className="contacts__links">
                <a href="tel:88007072360" className="contacts__link">
                  8 (800) 707-23-60
                </a>
                <a href="mailto:hello@appsstudio.ru" className="contacts__link">
                  hello@appsstudio.ru
                </a>
              </div>
              <div className="contacts__socials">
                {this.socials.map((social, key) => (
                  <a
                    href={social.link}
                    className="contacts__social"
                    key={key}
                    target="_blank"
                  >
                    <div className="contacts__socialInner">
                      <div className="contacts__socialPreview">
                        <img
                          src={
                            require(`../../img/contacts/${social.icon}`).default
                              .src
                          }
                          alt=""
                          className="contacts__socialIcon"
                        />
                      </div>
                      <p className="contacts__socialName">{social.name}</p>
                    </div>
                  </a>
                ))}
              </div>
              {device === "desktop" && (
                <div className="contacts__info">
                  <p className="contacts__infoTitle">Россия</p>
                  <p className="contacts__infoCopy">
                    © ООО “АППсСтудио”, 2013 - ∞
                  </p>
                </div>
              )}
            </div>
            <div className="contacts__item _form">
              <div className="contacts__form">
                <Form setLoad={this.setLoad} />
              </div>
            </div>
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

export default connect(mapStateToProps)(Contacts);
