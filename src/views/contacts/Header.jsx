import React, { Component } from "react";
import HeadPagenation from "../../components/HeadPagenation";
import Form from "../../components/Form";
import HandlerAnimate from "../../classes/HandlerAnimate";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.parent = React.createRef();
  }

  socials = [
    {
      key: "wa",
      content: "WhatsApp",
      link: "https://wa.me/79185659664",
      icon: "wa-icon-2.svg",
    },
    {
      key: "tg",
      content: "Telegram",
      link: "https://t.me/iBorshchov",
      icon: "tg-icon-2.svg",
    },
  ];

  pagenation = [
    {
      key: "",
      content: "Главная",
    },
    {
      key: "contacts",
      content: "Контакты",
      isCurrent: true,
    },
  ];

  footSocials = [
    {
      icon: "inst-foot-icon.svg",
      iconWhite: "inst-foot-icon-white.svg",
      href: "https://www.instagram.com/appsstudio_mobile/",
    },
    {
      icon: "fb-foot-icon.svg",
      iconWhite: "fb-foot-icon-white.svg",
      href: "https://www.facebook.com/appsstudio.ru/",
    },
    {
      icon: "vk-foot-icon.svg",
      iconWhite: "vk-foot-icon-white.svg",
      href: "https://vk.com/appsstudio",
    },
    {
      icon: "beh-foot-icon.svg",
      iconWhite: "beh-foot-icon-white.svg",
      href: "https://www.behance.net/jobs1217",
    },
  ];

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();
  }

  render() {
    return (
      <div ref={this.parent} className="contactsHeader">
        <div className="contactsHeader__pagenation">
          <HeadPagenation items={this.pagenation} />
        </div>
        <div className="contactsHeader__inner">
          <div className="contactsHeader__content">
            <div className="contactsHeader__items">
              <div className="contactsHeader__item _content">
                <div className="contactsHeader__title">
                  <h1 className="title _mediumSizeTablet">
                    <span className="title__elem">
                      <b>Контакты</b>
                    </span>
                    <i className="title__elem _icon title__icon _icon17">
                      <img
                        src={
                          require("../../img/emodzi/emodzi-17.png").default.src
                        }
                        alt=""
                        className="title__iconItem"
                      />
                    </i>
                  </h1>
                </div>
                <p className="contactsHeader__description">
                  Ответим в течении рабочего дня. Можем сразу дать
                  ориентировочную оценку, либо конкретизировать ее после
                  детального обсуждения
                </p>
              </div>
              <div className="contactsHeader__item _info">
                <div className="contactsHeader__links">
                  <a href="tel:88007072360" className="contactsHeader__link">
                    8 (800) 707-23-60
                  </a>
                  <a
                    href="mailto:hello@APPsStudio.ru"
                    className="contactsHeader__link"
                  >
                    hello@APPsStudio.ru
                  </a>
                </div>
                <div className="contactsHeader__socials">
                  {this.socials.map((social, key) => (
                    <a
                      href={social.link}
                      className="contactsHeader__social"
                      key={key}
                      target="_blank"
                    >
                      <img
                        src={
                          require(`../../img/contacts/${social.icon}`).default
                            .src
                        }
                        alt=""
                        className="contactsHeader__socialIcon"
                      />
                      <span className="contactsHeader__socialContent">
                        {social.content}
                      </span>
                    </a>
                  ))}
                </div>
                <p className="contactsHeader__text">
                  ООО “АППсСтудио”
                  <br />
                  Россия, 344010, г. Ростов-на-Дону, <br />
                  пер. Университетский, 113, офис 6А
                </p>
                <div className="contactsHeader__foot">
                  <p className="contactsHeader__footSupport">
                    Мы в соц. сетях:
                  </p>
                  <div className="contactsHeader__footLinks">
                    {this.footSocials.map((item, key) => (
                      <a
                        href={item.href}
                        className="contactsHeader__footLink"
                        key={key}
                        target="_blank"
                      >
                        <img
                          src={
                            require(`../../img/contacts/${item.icon}`).default
                              .src
                          }
                          alt=""
                          className="contactsHeader__footLinkIcon"
                        />
                        <img
                          src={
                            require(`../../img/contacts/${item.iconWhite}`)
                              .default.src
                          }
                          alt=""
                          className="contactsHeader__footLinkIcon _white"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="contactsHeader__form">
              <Form type="fast" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
