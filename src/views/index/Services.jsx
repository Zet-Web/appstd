import React, { Component } from "react";
import { connect } from "react-redux";

import Icon from "../../components/Icon.jsx";

import Case from "../../components/Case";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketplace: 0,
      shop: 0,
      mind: 0,
      currentIndexItem: 0,
      galeryState: -1,
    };

    this.handlerSlider = this.handlerSlider.bind(this);
    this.handlerScroll = this.handlerScroll.bind(this);
    this.handlerTouchStart = this.handlerTouchStart.bind(this);
    this.handlerUp = this.handlerUp.bind(this);
    this.handlerScrollForm = this.handlerScrollForm.bind(this);

    this.parent = React.createRef();
    this.slider = React.createRef();
  }

  items = [
    {
      key: "mind",
      title: [
        {
          type: "text",
          content: "<b>Искусственный</b>",
        },
        {
          type: "text",
          content: "<b> Интеллект</b>",
        },
      ],
      description:
        "Эффективное решение задачи с помощью машинного обучения (ML)",
      titleNav: "Искусственный Интеллект",
      content: [
        {
          type: "price",
          price: "870 750",
          duration: "3 месяцев",
        },
      ],
      items: [
        {
          image: "screen-mind-1.png",
          logo: "icon-merod.svg",
          name: "Пример проекта <br/>”Merod”",
        },
        {
          image: "screen-mind-2.png",
          logo: "icon-findFace.svg",
          name: "Пример проекта <br/>”Find by Face”",
        },
        {
          image: "screen-mind-3.png",
          logo: "icon-plonq.svg",
          name: "Пример проекта <br/>”PLONQ”",
        },
      ],
      link: "intelligence",
    },
    {
      key: "marketplace",
      title: [
        {
          type: "text",
          content: "<b>Маркетплейс</b>",
        },
      ],
      description:
        "Создание крутой площадки, где одни продают, другие покупают, а вы зарабатываете!",
      titleNav: "Маркетплейс",
      content: [
        {
          type: "price",
          price: "1 462 500",
          duration: "4 месяцев",
        },
      ],
      items: [
        {
          image: "screen-design-1.png",
          logo: "icon-lex.svg",
          name: "Пример проекта <br/>”LEX”",
        },
        {
          image: "screen-design-2.png",
          logo: "icon-ibibook.png",
          name: "Пример проекта <br/>”iBibook”",
        },
        {
          image: "screen-design-3.png",
          logo: "icon-weGo.png",
          name: "Пример проекта <br/>”WeGo”",
        },
      ],
      link: "marketplace",
    },
    {
      key: "shop",
      title: [
        {
          type: "text",
          content: "<b>Онлайн-магазин</b>",
        },
      ],
      description:
        "Разработка лучшего приложения для бизнеса по продаже товаров или услуг",
      titleNav: "Онлайн-магазин",
      content: [
        {
          type: "price",
          price: "897 500",
          duration: "3 месяцев",
        },
      ],
      items: [
        {
          image: "screen-shop-1.png",
          logo: "icon-eatRepeat.png",
          name: "Пример проекта <br/>”Eat Repeat”",
        },
        {
          image: "screen-shop-2.png",
          logo: "icon-dener.svg",
          name: "Пример проекта <br/>”Сеньор Денёр”",
        },
        {
          image: "screen-shop-3.png",
          logo: "icon-inClik.svg",
          name: "Пример проекта <br/>”In Clik”",
        },
      ],
      link: "onlineshop",
    },
  ];

  handlerSlider(name, isEvent = false) {
    this.setState((state) => {
      const newState = { ...state };
      let { currentIndexItem } = newState;

      switch (name) {
        case "prev":
          if (currentIndexItem !== 0) {
            currentIndexItem -= 1;
          } else {
            if (this.timerDisabledId) {
              clearTimeout(this.timerDisabledId);
            }
            this.eventDisabled = true;
            document.querySelector("body").style.overflow = "visible";
            window.scrollTo({
              top:
                window.pageYOffset - document.documentElement.clientHeight - 20,
              behavior: "smooth",
            });
            this.position = "before";
            setTimeout(() => {
              this.wasInSlider = false;
            }, 1000);
            setTimeout(
              () => {
                this.scrollDisabled = false;
              },
              isEvent === true ? 300 : 300
            );
          }
          break;
        case "next":
          if (currentIndexItem !== this.items.length - 1) {
            currentIndexItem += 1;
          } else {
            if (this.timerDisabledId) {
              clearTimeout(this.timerDisabledId);
            }
            this.eventDisabled = true;
            document.querySelector("body").style.overflow = "visible";
            window.scrollTo({
              top:
                window.pageYOffset + document.documentElement.clientHeight + 20,
              behavior: "smooth",
            });
            this.position = "after";

            setTimeout(() => {
              this.wasInSlider = false;
            }, 1000);

            setTimeout(
              () => {
                this.scrollDisabled = false;
              },
              isEvent === true ? 300 : 300
            );
          }
          break;
        default:
          break;
      }

      newState.currentIndexItem = currentIndexItem;

      return newState;
    });
  }

  position = null;
  scrollDisabled = false;
  isProccess = false;
  eventDisabled = true;
  timerDisabledId = null;
  wasInSlider = false;

  handlerScroll(e, isHard = false) {
    const { device, isUp, isScrollToForm, galery } = this.props;
    const inner = this.parent.current.querySelector(`.indexServices__inner`);
    const offset =
      (document.documentElement.clientHeight - inner.offsetHeight + 100) / 2;

    if (this.isProccess === true && this.wasInSlider === true) {
      return false;
    }

    if (
      this.scrollDisabled === true &&
      e.preventDefault &&
      typeof e.preventDefault === "function" &&
      isUp !== true &&
      isScrollToForm !== true &&
      galery.state === -1
    ) {
      e.preventDefault();

      if (this.isProccess === false && this.eventDisabled !== true) {
        if (e.deltaY < -5) {
          this.isProccess = true;
          this.handlerSlider("prev", true);
          setTimeout(() => {
            this.isProccess = false;
          }, 1000);
        }
        if (e.deltaY > 5) {
          this.isProccess = true;
          this.handlerSlider("next", true);
          setTimeout(() => {
            this.isProccess = false;
          }, 1000);
        }

        if (e.changedTouches) {
          const moveX = this.startX - e.changedTouches[0].pageX;

          if (moveX < -50) {
            this.isProccess = true;
            this.handlerSlider("prev", true);
            setTimeout(() => {
              this.isProccess = false;
            }, 3000);
          }

          if (moveX > 50) {
            this.isProccess = true;
            this.handlerSlider("next", true);
            setTimeout(() => {
              this.isProccess = false;
            }, 3000);
          }
        }
      }

      // return false;
    }

    if (
      ((inner.getBoundingClientRect().y <
        document.documentElement.clientHeight / 2 &&
        this.position === "before") ||
        (inner.getBoundingClientRect().y + inner.clientHeight >
          document.documentElement.clientHeight / 2 &&
          this.position === "after") ||
        isHard) &&
      this.scrollDisabled === false &&
      device !== "mobile" &&
      this.eventDisabled === true
    ) {
      this.scrollDisabled = true;

      document.querySelector("body").style.overflow = "hidden";
      this.wasInSlider = true;

      this.timerDisabledId = setTimeout(() => {
        this.eventDisabled = false;
      }, 500);

      window.scrollTo({
        top: window.pageYOffset + inner.getBoundingClientRect().y - offset,
        behavior: "smooth",
      });
    }
  }

  setPosition() {
    const inner = this.parent.current.querySelector(`.indexServices__inner`);

    if (
      inner.getBoundingClientRect().y >= document.documentElement.clientHeight
    ) {
      this.position = "before";
    }

    if (inner.getBoundingClientRect().y <= 0) {
      this.position = "after";
      this.setState({ currentIndexItem: 2 });
    }
  }

  startX = 0;

  handlerTouchStart(e) {
    this.startX = e.changedTouches[0].pageX;
  }

  handlerUp() {
    const { device } = this.props;

    if (device !== "mobile") {
      this.setState(
        (state) => {
          const newState = { ...state };

          newState.currentIndexItem = 0;

          return newState;
        },
        () => {
          setTimeout(() => {
            this.scrollDisabled = false;
            this.eventDisabled = true;
            this.setPosition();
            document.querySelector("body").style.overflow = "visible";
          }, 1000);
        }
      );
    }
  }

  handlerScrollForm() {
    const { device } = this.props;

    if (device !== "mobile") {
      this.setState(
        (state) => {
          const newState = { ...state };

          newState.currentIndexItem = 2;

          return newState;
        },
        () => {
          setTimeout(() => {
            this.scrollDisabled = false;
            this.eventDisabled = true;
            this.setPosition();
            document.querySelector("body").style.overflow = "visible";
          }, 1000);
        }
      );
    }
  }

  componentDidMount() {
    this.setPosition();
    if (this.position === null) {
      this.handlerScroll({}, true);
    }
    document.addEventListener("mousewheel", this.handlerScroll, {
      passive: false,
    });
    document.addEventListener("touchstart", this.handlerTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", this.handlerScroll, {
      passive: false,
    });
    document.addEventListener("scrollUp", this.handlerUp);
    document.addEventListener("scrollToForm", this.handlerScrollForm);
  }

  componentDidUpdate() {
    const { galeryState } = this.state;
    const { galery } = this.props;
    const { state } = galery;

    if (galeryState !== state) {
      if (galeryState !== -1) {
        document.querySelector("body").style.overflow = "hidden";
      }
      this.setState({ galeryState: state });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousewheel", this.handlerScroll);
    document.removeEventListener("touchstart", this.handlerTouchStart);
    document.removeEventListener("touchmove", this.handlerScroll);
    document.removeEventListener("scrollUp", this.handlerUp);
    document.removeEventListener("scrollToForm", this.handlerScrollForm);
  }

  render() {
    const { currentIndexItem } = this.state;
    const { device } = this.props;
    const nextItem = this.items[currentIndexItem + 1];

    return (
      <div ref={this.parent} className="indexServices">
        <div className="indexServices__inner">
          <div className="indexServices__content">
            <div
              ref={this.slider}
              className="indexServices__items"
              style={
                (device !== "mobile" && {
                  transform: `translate3d(${-100 * currentIndexItem}vw,0,0)`,
                }) ||
                {}
              }
            >
              {this.items.map((item, key) => {
                return (
                  <div
                    className={`indexServices__item ${
                      currentIndexItem === key ? "_show" : ""
                    }`}
                    key={key}
                    data-key={key}
                  >
                    <Case
                      model={item}
                      info={{
                        type: "index",
                        caseKey: key,
                        len: this.items.length,
                        nextItem:
                          (this.items[key + 1] &&
                            this.items[key + 1].titleNav) ||
                          null,
                        handlerSlider: this.handlerSlider,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {device === "desktop" && false && (
              <div className="indexServices__nav">
                <div className="caseNav">
                  <div className="caseNav__arrows">
                    {["prev", "next"].map((name) => (
                      <div
                        key={name}
                        className={`caseNav__arrow _${name} ${
                          (currentIndexItem === 0 && name === "prev") ||
                          (currentIndexItem === this.items.length - 1 &&
                            name === "next")
                            ? "_disable"
                            : ""
                        }`}
                        onClick={() => {
                          this.handlerSlider(name);
                        }}
                      >
                        <i className="caseNav__arrowIcon">
                          <Icon name={`arrow-cases-${name}`} />
                        </i>
                      </div>
                    ))}
                  </div>
                  <div className="caseNav__content">
                    {(nextItem && nextItem.titleNav) || null}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    device: state.device,
    isUp: state.isUp,
    isScrollToForm: state.isScrollToForm,
    galery: state.galery,
  };
}

export default connect(mapStateToProps)(Services);
