import React, { Component } from "react";
import { connect } from "react-redux";

import Icon from "../../components/Icon.jsx";
import Slider from "../../functions/Slider";
import ServicesForm from "../ServicesForm.jsx";
import HandlerAnimate from "../../classes/HandlerAnimate.js";
import getFormatedPrice from "../../functions/getFormatedPrice.js";
import getEndPhrase from "../../functions/getEndPhrase.js";
import getOffsetPosition from "../../functions/getOffsetPosition.js";
import scrollTo from "../../functions/scrollTo.js";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGetHeight: false,
      showForm: {
        main: {
          state: -1,
          cardKey: null,
        },
        extra: {
          state: -1,
          cardKey: null,
        },
      },
    };

    this.setSlider = this.setSlider.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.showFormOutside = this.showFormOutside.bind(this);
    this.successSend = this.successSend.bind(this);

    this.parent = React.createRef();
  }

  colors = [
    "#D2F4E4",
    "#BFDFE6",
    "#F5E6FE",
    "#EEF7D1",
    "#EAEAF6",
    "#FBEDE6",
    "#D1D4E4",
    "#FAECFC",
    "#D4F4FB",
    "#DAE9F3",
    "#F4E4D2",
    "#FFE0E3",
    "#D7EFFE",
    "#F5EEEE",
    "#F4F7F9",
  ];

  info = {
    main: {
      title: "Основные",
    },
    extra: {
      title: "Услуги всего цикла",
    },
  };

  sliders = {};

  setSlider() {
    const { services } = this.props;

    if (!this.isInitSlider && services) {
      this.isInitSlider = true;

      services.forEach((block, key) => {
        const slider = this.parent.current.querySelector(
          `.caseOrder__block[data-key="${key}"]`
        );

        if (block.items.length) {
          this.sliders[key] = new Slider({
            slider,
            lay: slider.querySelector(".caseOrder__blockCards"),
            items: slider.querySelectorAll(".caseOrder__blockCard"),
            infinity: false,
            current: 0,
            buttons: {
              prev: slider.querySelector(".sliderArrow._prev"),
              next: slider.querySelector(".sliderArrow._next"),
              parent: slider.querySelector(".caseOrder__blockArrows"),
            },
          });
        }
      });
    }
  }

  height = null;

  getHeight() {
    const { isGetHeight } = this.state;

    if (
      !isGetHeight &&
      this.parent.current.querySelector(".caseOrder__blockForm")
    ) {
      const height = this.parent.current.querySelector(
        ".caseOrder__blockForm"
      ).clientHeight;

      this.setState({ isGetHeight: true });

      setTimeout(() => {
        this.setState({ isReady: true });
      }, 500);
      this.height = height;
    }
  }

  isInitSlider = false;

  handlerCard({ action, key, cardKey = null, isOut }) {
    const { showForm } = this.state;
    const { device } = this.props;
    let formMainIsShow = false;
    const thisFormIsShow = showForm[key].state === 1;

    switch (action) {
      case "show":
        Object.keys(showForm).forEach((prop) => {
          if (prop !== key) {
            this.handlerCard({ action: "hide", key: prop });
            if (prop === "main" && showForm[prop].state === 1) {
              formMainIsShow = true;
            }
          }
        });

        console.log(key, cardKey);

        const block = this.parent.current.querySelector(
          `.caseOrder__block[data-name="${key}"]`
        );
        const keyOfParent = +block.getAttribute("data-key");
        this.sliders[keyOfParent].setNeedItem(cardKey);

        this.setState((state) => {
          const newState = { ...state };
          const showForm = { ...newState.showForm };

          showForm[key].state = 0;
          showForm[key].cardKey = cardKey;

          newState.showForm = showForm;

          return newState;
        });

        setTimeout(() => {
          this.setState(
            (state) => {
              const newState = { ...state };
              const showForm = { ...newState.showForm };

              showForm[key].state = 1;

              newState.showForm = showForm;

              return newState;
            },
            () => {
              const block = this.parent.current.querySelector(
                `.caseOrder__block[data-name="${key}"]`
              );
              const form = block.querySelector(".servicesForm");
              let top =
                getOffsetPosition(form)[1] -
                document.documentElement.clientHeight / 2 +
                this.height / 2 -
                document.querySelector(".topBar").clientHeight / 2;

              if (device === "mobile") {
                top =
                  getOffsetPosition(form)[1] -
                  document.querySelector(".topBar").clientHeight -
                  100;
              }

              if (formMainIsShow) {
                top -= this.height;
              }

              if (!thisFormIsShow || isOut) {
                scrollTo(top, 1000);
              }
            }
          );
        }, 10);
        break;
      case "hide":
        this.setState((state) => {
          const newState = { ...state };
          const showForm = { ...newState.showForm };

          showForm[key].state = 0;

          newState.showForm = showForm;

          return newState;
        });

        setTimeout(() => {
          this.setState((state) => {
            const newState = { ...state };
            const showForm = { ...newState.showForm };

            showForm[key].state = -1;
            showForm[key].cardKey = null;

            newState.showForm = showForm;

            return newState;
          });
        }, 500);
        break;
      default:
        {
          if (showForm[key].state === -1) {
            this.handlerCard({ action: "show", key, cardKey });
          }
          if (showForm[key].state === 1) {
            if (showForm[key].cardKey === cardKey) {
              this.handlerCard({ action: "hide", key, cardKey });
            } else {
              this.handlerCard({ action: "show", key, cardKey });
            }
          }
        }
        break;
    }
  }

  successSend({ key }) {
    this.handlerCard({ action: "hide", key });
  }

  showFormOutside(e) {
    const { services } = this.props;
    const { detail } = e;
    const { id } = detail;

    console.log(id);

    const currentService =
      services &&
      services.find((service) => service.items.find((item) => item.id === id));
    const currentServiceKey = currentService && currentService.key;
    const currentItemKey =
      currentService &&
      currentService.items.findIndex((item) => item.id === id);

    if (currentServiceKey && currentItemKey !== undefined) {
      const block = this.parent.current.querySelector(
        `.caseOrder__blockCard[data-blockId="${id}"]`
      );
      const key = +block.getAttribute("data-id");
      const keyOfParent = +block
        .closest(".caseOrder__block")
        .getAttribute("data-key");

      this.sliders[keyOfParent].setNeedItem(key);

      this.handlerCard({
        action: "show",
        key: currentServiceKey,
        cardKey: currentItemKey,
        isOut: true,
      });
    }
  }

  componentDidMount() {
    this.setSlider();
    this.getHeight();

    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    document.addEventListener("showOrderFormOutside", this.showFormOutside);
  }

  componentDidUpdate() {
    this.setSlider();
    this.getHeight();
  }

  componentWillUnmount() {
    document.removeEventListener("showOrderFormOutside", this.showFormOutside);
  }

  render() {
    const { isGetHeight, isReady, showForm } = this.state;
    const { model, device } = this.props;
    const services =
      (this.props.services &&
        JSON.parse(JSON.stringify(this.props.services))) ||
      null;

    const cardColors = {};

    if (services) {
      const allItems = services.reduce(
        (prev, cur) => prev.concat(cur.items),
        []
      );

      allItems.forEach((item, key) => {
        const color = key % this.colors.length;

        cardColors[item.idColor] = this.colors[color];
      });
    }

    return (
      <div
        ref={this.parent}
        className={`caseOrder ${(isReady && `_ready`) || ``}`}
        style={
          services &&
          services.reduce((prev, cur) => prev + cur.items.length, 0) === 0
            ? { display: "none" }
            : {}
        }
      >
        <div className="caseOrder__inner">
          <div className="caseOrder__content">
            {device === "desktop" ? (
              <div className="caseOrder__title">
                <h3 className="title _mediumSizeTablet _tall">
                  <span className="title__elem">Заказать</span>{" "}
                  <span className="title__elem">услугу</span>{" "}
                  <span className="title__elem">по</span>
                  <i className={`title__elem _icon title__icon _icon13`}>
                    <img
                      src={
                        require(`../../img/emodzi/emodzi-13.png`).default.src
                      }
                      alt=""
                      className="title__iconItem"
                    />
                  </i>
                  <span className="title__elem">разработке</span>{" "}
                  <span className="title__elem">{model.title}</span>
                </h3>
              </div>
            ) : (
              <div className="caseOrder__title">
                <h3 className="title _mediumSizeTablet _tall">
                  <span className="title__elem">Заказать</span>{" "}
                  <span className="title__elem">услугу</span>
                  <i className={`title__elem _icon title__icon _icon13`}>
                    <img
                      src={
                        require(`../../img/emodzi/emodzi-13.png`).default.src
                      }
                      alt=""
                      className="title__iconItem"
                    />
                  </i>
                  <br />
                  <span className="title__elem">по</span>{" "}
                  <span className="title__elem">разработке</span>{" "}
                  <span className="title__elem">маркетплейса</span>
                </h3>
              </div>
            )}
            <div className="caseOrder__blocks">
              {services &&
                services
                  .filter((block) => block.items.length)
                  .map((block, key) => (
                    <div
                      className={`caseOrder__block`}
                      key={key}
                      data-key={key}
                      data-name={block.key}
                    >
                      <h3 className="caseOrder__blockTitle">
                        {this.info[block.key].title}:
                      </h3>
                      <div className="caseOrder__blockContent">
                        <div className="caseOrder__blockCards">
                          {block.items.map((card, cardKey) => (
                            <div
                              className={`caseOrder__blockCard`}
                              data-blockId={card.id}
                              key={cardKey}
                              onClick={() =>
                                this.handlerCard({
                                  action: "toggle",
                                  key: block.key,
                                  cardKey,
                                })
                              }
                            >
                              <div
                                className={`caseServiceCard ${
                                  showForm[block.key].state === 1 &&
                                  showForm[block.key].cardKey === cardKey
                                    ? "_active"
                                    : ""
                                }`}
                                style={{ background: cardColors[card.idColor] }}
                              >
                                <h4 className="caseServiceCard__title">
                                  {card.name}
                                </h4>
                                <div className="caseServiceCard__info">
                                  <p className="caseServiceCard__price">
                                    от{" "}
                                    <span>{getFormatedPrice(card.price)}</span>{" "}
                                    руб
                                  </p>
                                  <p className="caseServiceCard__duration">
                                    от {card.terms}{" "}
                                    {getEndPhrase(card.terms, [
                                      "дня",
                                      "дней",
                                      "дней",
                                    ])}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="caseOrder__blockArrows">
                        <div className="caseOrder__blockArrow">
                          <div className="sliderArrow _prev">
                            <i className="sliderArrow__icon">
                              <Icon name="arrow-slider-prev" />
                            </i>
                          </div>
                        </div>
                        <div className="caseOrder__blockArrow">
                          <div className="sliderArrow _next">
                            <i className="sliderArrow__icon">
                              <Icon name="arrow-slider-next" />
                            </i>
                          </div>
                        </div>
                      </div>
                      <div
                        className="caseOrder__blockForm"
                        style={
                          isGetHeight === true
                            ? {
                                height: `${
                                  showForm[block.key].state === 1
                                    ? this.height
                                    : 0
                                }px`,
                              }
                            : {}
                        }
                      >
                        <div className="caseOrder__blockFormInner">
                          {showForm[block.key].state >= 0 && (
                            <ServicesForm
                              key={showForm[block.key].cardKey}
                              model={block.items[showForm[block.key].cardKey]}
                              color={
                                cardColors[
                                  block.items[showForm[block.key].cardKey]
                                    ?.idColor
                                ]
                              }
                              callbackSuccessSend={() => {
                                this.successSend({ key: block.key });
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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

export default connect(mapStateToProps)(Order);
