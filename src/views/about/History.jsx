import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "../../functions/Slider";
import getOffsetPosition from "../../functions/getOffsetPosition";

import HistoryCard from "../../components/HistoryCard.jsx";
import HandlerAnimate from "../../classes/HandlerAnimate";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
    };

    this.handlerCard = this.handlerCard.bind(this);
    this.initSlider = this.initSlider.bind(this);

    this.parent = React.createRef();
  }

  cards = [
    {
      key: 2021,
      background: "#D2F4E4",
    },
    {
      key: 2020,
      background: "#EEF7D1",
    },
    {
      key: 2019,
      background: "#D7EFFE",
    },
    {
      key: 2018,
      background: "#EAEAF6",
    },
    {
      key: 2017,
      background: "#D1D4E4",
    },
    {
      key: 2016,

      background: "#DAE9F3",
    },
    {
      key: 2015,
      background: "#BFDFE6",
    },
    {
      key: 2014,
      background: "#FAECFC",
    },
    {
      key: 2013,
      background: "#D2F4E4",
    },
  ];

  logos = [
    {
      icon: "logo-1.svg",
      year: "2013",
    },
    {
      icon: "logo-2.svg",
      year: "2014",
    },
    {
      icon: "logo-3.svg",
      year: "2018",
    },
    {
      icon: "logo-4.svg",
      year: "2019",
    },
    {
      icon: "logo-5.svg",
      year: "2021",
    },
  ];

  handlerCard(key) {
    const card = this.parent.current.querySelector(
      `.aboutHistory__card[data-key="${key}"]`
    );
    const head = card.querySelector(".aboutHistory__cardHead");
    const inner = card.querySelector(".aboutHistory__cardDropInner");
    const top = getOffsetPosition(card)[1];
    const heightAll = head.clientHeight + inner.clientHeight;
    const diff = (document.documentElement.clientHeight - heightAll) / 2 + 80;

    window.scrollTo({
      top: top - diff,
      behavior: "smooth",
    });

    this.setState((state) => {
      const newState = { ...state };
      const cards = [...newState.cards];
      const index = cards.findIndex((item) => item.key === key);

      cards[index].isOpen = !cards[index].isOpen;

      newState.cards = cards;

      return newState;
    });
  }

  initSlider() {
    const { info } = this.props;
    const slider = this.parent.current.querySelector(".aboutHistory__logos");

    if (this.isInitSlider === false && info) {
      new Slider({
        slider,
        lay: slider.querySelector(".aboutHistory__logosInner"),
        items: slider.querySelectorAll(".aboutHistory__logo"),
        infinity: false,
        type: "mobile",
        current: 0,
      });
    }
  }

  isInitSlider = false;

  componentDidMount() {
    this.setState((state) => {
      const newState = { ...state };

      newState.cards = this.cards.map((card) => ({
        key: card.key,
        isOpen: false,
      }));

      return newState;
    });

    this.initSlider();

    this.handlerAnimateInfo2 = new HandlerAnimate({
      type: "case",
      parent: this.parent.current.querySelector(".aboutHistory__logos"),
      classParent: ".aboutHistory__logos",
    });

    this.handlerAnimateInfo2.init();
    this.handlerAnimateInfo2.handler();
  }

  componentDidUpdate() {
    this.initSlider();
  }

  render() {
    const { cards } = this.state;
    const { info } = this.props;

    return (
      <div ref={this.parent} className="aboutHistory">
        <div className="aboutHistory__inner">
          <h3 className="aboutHistory__title">
            Краткая история студии в&nbsp;обратной хорологии
          </h3>
          <div className="aboutHistory__content">
            {info &&
              info.chronology &&
              info.chronology.map((card, key) => {
                const stateCard =
                  (cards &&
                    JSON.parse(
                      JSON.stringify(
                        cards.find((item) => item.key === card.year)
                      )
                    )) ||
                  {};

                return (
                  <HistoryCard
                    card={{
                      ...card,
                      ...this.cards.find((item) => item.key === card.year),
                    }}
                    stateCard={stateCard}
                    handlerCard={this.handlerCard}
                    parent={this.parent}
                    key={key}
                  />
                );
              })}
          </div>
          <h3 className="aboutHistory__title">Эволюция логотипа</h3>
          <div className="aboutHistory__logos _hide">
            <div className="aboutHistory__logosInner">
              {info &&
                info.history_logo.map((logo, key) => (
                  <div className={`aboutHistory__logo _${key + 1}`} key={key}>
                    <img
                      src={logo.image}
                      alt=""
                      className="aboutHistory__logoIcon"
                    />
                    <p className="aboutHistory__logoYear">{logo.year}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(History);
