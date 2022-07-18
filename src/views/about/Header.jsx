import React, { Component } from "react";
import { connect } from "react-redux";

import setSpacesInText from "../../functions/setSpacesInText";
import HeadPagenation from "../../components/HeadPagenation.jsx";
import CustomeLink from "../../components/CustomeLink";
import HandlerAnimate from "../../classes/HandlerAnimate";

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
      content: "О студии",
      isCurrent: true,
    },
  ];

  about = [
    {
      key: "positions",
      title: "Позиционирование",
      description:
        "Качественно. Технологично. Комплексно. <b>Минимум действий от Заказчика</b>",
    },
    {
      key: "mission",
      title: "Миссия",
      description:
        "Автоматизировать разработку приложений с помощью ИИ, стабильно улучшая качество",
    },
  ];

  stats = [
    {
      key: "projects",
      prop: "number_projects",
      description: "Проектов",
    },
    {
      key: "age",
      prop: "years",
      description: "Лет на рынке",
    },
    {
      key: "teams",
      prop: "number_workers",
      description: "Профессионалов",
    },
  ];

  advantages = [
    {
      key: "result",
      title: "Гарантия результата",
      description:
        "Если разработанный проект не будет работать, мы полностью оплатим повторную разработку в любой другой студии",
    },
    {
      key: "quality",
      title: "Гарантия качества",
      description: "Техническая поддержка в течении 12 месяцев - бесплатно",
    },
    {
      key: "pay",
      title: "Гибкая оплата",
      description:
        "Разделим стоимость разработки на подходящие ежемесячные платежи",
    },
  ];

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.handlerAnimateStats = new HandlerAnimate({
      type: "statsItems",
      parent: this.parent.current,
      classParent: ".aboutHeader__about",
    });

    this.handlerAnimateStats.init();
    setTimeout(() => {
      this.handlerAnimateStats.handler();
    }, 100);

    this.handlerAnimateInfo = new HandlerAnimate({
      type: "statsItems",
      parent: this.parent.current,
      classParent: ".aboutHeader__statsCard",
    });

    this.handlerAnimateInfo.init();
    setTimeout(() => {
      this.handlerAnimateInfo.handler();
    }, 200);

    this.handlerAnimateInfo2 = new HandlerAnimate({
      type: "statsItems",
      parent: this.parent.current,
      classParent: ".aboutHeader__servicesItem",
    });

    this.handlerAnimateInfo2.init();
    this.handlerAnimateInfo2.handler();
  }

  render() {
    const { info } = this.props;

    return (
      <div ref={this.parent} className="aboutHeader">
        <div className="aboutHeader__inner">
          <div className="aboutHeader__pagenation">
            <HeadPagenation items={this.pagenation} />
          </div>
          <div className="aboutHeader__head">
            <div className="aboutHeader__title">
              <h1 className="title _mediumSizeTablet">
                <span className="title__elem">
                  <b>APPs</b>
                </span>
                {` `}
                <span className="title__elem">
                  <b>Studio</b>
                </span>
                <i className="title__elem _icon title__icon _icon3-1">
                  <img
                    src={require("../../img/emodzi/emodzi-3.png").default.src}
                    alt=""
                    className="title__iconItem"
                  />
                </i>
              </h1>
            </div>
            {this.about.map((item, key) => (
              <div className={`aboutHeader__about _${item.key}`} key={key}>
                <h2 className="aboutHeader__aboutTitle">{item.title}</h2>
                <p
                  className="aboutHeader__aboutDescription"
                  dangerouslySetInnerHTML={{
                    __html: setSpacesInText(item.description),
                  }}
                ></p>
              </div>
            ))}
          </div>
          <div className="aboutHeader__stats">
            {this.stats.map((stat, key) => (
              <div className={`aboutHeader__statsCard _${stat.key}`} key={key}>
                <h4 className="aboutHeader__statsCardCounter">
                  {info && info[stat.prop]}
                </h4>
                <p className="aboutHeader__statsCardDescription">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
          <div className="aboutHeader__services">
            <div className="aboutHeader__servicesItem">
              <p className="aboutHeader__servicesItemCounter">01.</p>
              <p className="aboutHeader__servicesItemDescription">
                Создаём крутые{" "}
                <CustomeLink href="/marketplace">
                  <a>маркетплейсы</a>
                </CustomeLink>
                , где одни продают, другие покупают, а&nbsp;вы зарабатываете
              </p>
            </div>
            <div className="aboutHeader__servicesItem">
              <p className="aboutHeader__servicesItemCounter">02.</p>
              <p className="aboutHeader__servicesItemDescription">
                Разрабатываем лучшие{" "}
                <CustomeLink href="/onlineshop">
                  <a>онлайн-магазины</a>
                </CustomeLink>{" "}
                по продаже товаров и&nbsp;услуг
              </p>
            </div>
            <div className="aboutHeader__servicesItem">
              <p className="aboutHeader__servicesItemCounter">03.</p>
              <p className="aboutHeader__servicesItemDescription">
                Эффективно решаем задачи с&nbsp;помощью{" "}
                <CustomeLink href="/intelligence">
                  <a>Искусственного Интеллекта</a>
                </CustomeLink>
              </p>
            </div>
          </div>
          <div className="aboutHeader__advantages">
            {this.advantages.map((item, key) => (
              <div
                className={`aboutHeader__advantagesItem _${item.key}`}
                key={key}
              >
                <h3 className="aboutHeader__advantagesItemTitle">
                  {item.title}
                </h3>
                <p
                  className="aboutHeader__advantagesItemDescription"
                  dangerouslySetInnerHTML={{
                    __html: setSpacesInText(item.description),
                  }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Header);
