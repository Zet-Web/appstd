import React, { Component } from "react";
import HandlerAnimate from "../../classes/HandlerAnimate";

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.parent = React.createRef();
  }

  items = [
    {
      prop: "number_projects",
      description: "Проектов",
      key: "projets",
    },
    {
      description: "UX/UI",
      key: "ux-ui",
    },
    {
      description: "iOS",
      key: "ios",
    },
    {
      description: "Android",
      key: "android",
    },
    {
      description: "Back-end",
      key: "backend",
    },
    {
      prop: "years",
      description: "Лет на <br/>рынке",
      key: "age",
    },
    {
      prop: "number_workers",
      description: "Человек <br/>команда",
      key: "team",
    },
    {
      description: "Работаем <br/>по fix price",
      key: "fixprice",
    },
    {
      propDescription: "price_hour",
      key: "pricetohour",
    },
    {
      description: "Искусственный <br/>Интеллект",
      key: "mind",
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
      classParent: ".indexStats__item",
    });

    this.handlerAnimateStats.init();
    this.handlerAnimateStats.handler();
  }

  render() {
    const { info } = this.props;

    return (
      <div ref={this.parent} className="indexStats">
        <div className="indexStats__inner">
          <div className="indexStats__title">
            <h1 className="title">
              <span className="title__elem">APPs</span>{" "}
              <span className="title__elem">Studio</span>
              <i className="title__elem _icon title__icon _icon3">
                <img
                  src={require("../../img/emodzi/emodzi-3.png").default.src}
                  alt=""
                  className="title__iconItem"
                />
              </i>
            </h1>
          </div>
          <div className="indexStats__content">
            {this.items.map((item, key) => (
              <div className={`indexStats__item _${item.key}`} key={key}>
                {item.prop && (
                  <div className="indexStats__itemCounter">
                    {(info && item.prop && info[item.prop]) ||
                      item.counter ||
                      ``}
                  </div>
                )}
                <p
                  className="indexStats__itemDescription"
                  dangerouslySetInnerHTML={{
                    __html:
                      (info &&
                        item.propDescription &&
                        info[item.propDescription]) ||
                      item.description ||
                      ``,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
