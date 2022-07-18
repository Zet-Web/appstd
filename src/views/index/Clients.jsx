import React, { Component } from "react";

import Slider from "../../functions/Slider";
import HandlerAnimate from "../../classes/HandlerAnimate";
import SliderStroke from "../../functions/SliderStroke";

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.parent = React.createRef();
  }

  clients = [
    {
      logo: "logo-client-merod.png",
      key: "merod",
    },
    {
      logo: "logo-client-lex.svg",
      key: "lex",
    },
    {
      logo: "logo-client-plonq.svg",
      key: "plonq",
    },
    {
      logo: "logo-client-rjd.png",
      key: "rjd",
    },
    {
      logo: "logo-client-eatRepeat.svg",
      key: "eatRepeat",
    },
    {
      logo: "logo-client-inClik.svg",
      key: "inClik",
    },
    {
      logo: "logo-client-aParty.svg",
      key: "aParty",
    },
    {
      logo: "logo-client-smyslografia.png",
      key: "smyslografia",
    },
    {
      logo: "logo-client-mercada.png",
      key: "mercada",
    },
  ];

  componentDidMount() {
    const items = this.parent.current.querySelector(
      ".indexClients__sliderItems"
    );

    const slider = new SliderStroke({
      items,
      classItem: ".indexClients__sliderItem",
    });

    slider.init();

    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();
  }

  render() {
    const { type } = this.props;

    return (
      <div ref={this.parent} className="indexClients">
        <div className="indexClients__inner">
          <div className="indexClients__title">
            {type === "clients" ? (
              <h3 className="title _mediumSizeTablet">
                <span className="title__elem">Наши</span>
                <i className="title__elem _icon title__icon _icon7-2">
                  <img
                    src={require("../../img/emodzi/emodzi-7-2.png").default.src}
                    alt=""
                    className="title__iconItem"
                  />
                </i>
                <span className="title__elem">клиенты</span>
              </h3>
            ) : (
              <h3 className="title _mediumSizeTablet">
                <span className="title__elem">Нам</span>
                <span>
                  <i className="title__elem _icon title__icon _icon7">
                    <img
                      src={require("../../img/emodzi/emodzi-7.png").default.src}
                      alt=""
                      className="title__iconItem"
                    />
                  </i>
                </span>
                <span className="title__elem">доверяют</span>
              </h3>
            )}
          </div>
        </div>
        <div className="indexClients__slider">
          <div className="indexClients__sliderItems">
            {this.clients.map((client, key) => (
              <div
                className={`indexClients__sliderItem _${client.key}`}
                key={key}
              >
                <img
                  src={require(`../../img/clients/${client.logo}`).default.src}
                  alt=""
                  className="indexClients__sliderItemImage"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Clients;
