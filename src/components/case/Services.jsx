import React, { Component, ReactDOM } from "react";
import { connect } from "react-redux";

import setSpacesInText from "../../functions/setSpacesInText";

import Icon from "../Icon.jsx";
import Slider from "../../functions/Slider";
import HandlerAnimate from "../../classes/HandlerAnimate";
import getOffsetPosition from "../../functions/getOffsetPosition";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 0,
    };

    this.handlerInfo = this.handlerInfo.bind(this);
    this.handlerSliderItems = this.handlerSliderItems.bind(this);

    this.parent = React.createRef();
  }

  // renderContent(item) {
  //   // switch (item.type) {
  //   //   case "text":
  //   //     return (
  //   //       <p
  //   //         className="textAnimate caseServicesCard__text"
  //   //         key={key}
  //   //         dangerouslySetInnerHTML={{
  //   //           __html: setSpacesInText(item.content),
  //   //         }}
  //   //       ></p>
  //   //     );
  //   //   case "list":
  //   //     return (
  //   //       <ul className="caseServicesCard__list">
  //   //         {item.content.map((el, keyEl) => (
  //   //           <li
  //   //             className="textAnimate caseServicesCard__listItem"
  //   //             key={keyEl}
  //   //           >
  //   //             {el}
  //   //           </li>
  //   //         ))}
  //   //       </ul>
  //   //     );
  //   //   default:
  //   //     return null;
  //   // }
  // }

  setSlider() {
    const slider = this.parent.current.querySelector(".caseServices__content");

    new Slider({
      slider,
      lay: slider.querySelector(".caseServices__items"),
      items: slider.querySelectorAll(".caseServices__item"),
      infinity: false,
      showEachSlide: true,
      current: this.state.currentItem,
      buttons: {
        prev: slider.querySelector(".sliderArrow._prev"),
        next: slider.querySelector(".sliderArrow._next"),
      },
      pagenation: {
        parent: slider.querySelector(".pagenation"),
        dot: "pagenation__item",
      },
      data: { name: "caseServices" },
    });
  }

  handlerInfo(action, key) {
    const item = this.state.items[key];

    switch (action) {
      case "show":
        const card = this.parent.current.querySelector(
          `.caseServices__item[data-key="${key}"]`
        );
        const inner = card.querySelector(".caseServicesCard__info");
        const top = getOffsetPosition(inner)[1];

        window.scrollTo({
          top: top - 100,
          behavior: "smooth",
        });

        this.setState((state) => {
          const newState = { ...state };
          const items = [...newState.items];

          items[key].isShow = true;

          newState.items = items;

          return newState;
        });
        break;
      case "hide":
        this.setState((state) => {
          const newState = { ...state };
          const items = [...newState.items];

          items[key].isShow = false;

          newState.items = items;

          return newState;
        });
        break;
      case "toggle":
        this.handlerInfo(item.isShow === false ? "show" : "hide", key);
        break;
      default:
        break;
    }
  }

  handlerSliderItems(e) {
    const { detail } = e;
    const { current, data } = detail;

    if (data && data.name === "caseServices") {
      this.setState((state) => {
        const newState = { ...state };
        const items = [...newState.items];

        items.forEach((item, key) => {
          items[key].isShow = false;
        });

        newState.items = items;

        newState.currentItem = current;

        return newState;
      });
    }
  }

  getStyleBox(isShow) {
    const { currentItem } = this.state;
    const { device } = this.props;
    const style = {};

    if (device === "mobile" && this.parent.current) {
      const currentEl = this.parent.current.querySelector(
        `.caseServices__item[data-key="${currentItem}"]`
      );

      style.height =
        currentEl.querySelector(".caseServicesCard__body").offsetHeight +
        currentEl.querySelector(".caseServicesCard__infoHead").offsetHeight +
        30 +
        (isShow === true &&
          currentEl.querySelector(".caseServicesCard__infoContentInner")
            .offsetHeight + 20);
    }

    return style;
  }

  componentDidMount() {
    const { model } = this.props;

    this.setSlider();

    document.addEventListener("change-slider", this.handlerSliderItems);

    this.handlerAnimateText = new HandlerAnimate({
      type: "text",
      classParent: ".textAnimate",
      parent: this.parent.current,
    });

    this.handlerAnimateText.init();
    this.handlerAnimateText.handler();

    setTimeout(() => {
      this.setState((state) => {
        const newState = { ...state };

        newState.items = model.cards.map(() => ({ isShow: false }));

        return newState;
      });
    }, 100);
  }

  componentWillUnmount() {
    document.removeEventListener("change-slider", this.handlerSliderItems);
  }

  render() {
    const { currentItem, items } = this.state;
    const { model } = this.props;
    const currentEl = items && items[currentItem];

    return (
      <div ref={this.parent} className="caseServices">
        <div className="caseServices__inner">
          <div className="caseServices__nav">
            <ul className="caseServices__list">
              {model.cards &&
                model.cards.map((block, key) => (
                  <li
                    className={`caseServices__listItem ${
                      this.state.currentItem === key ? "_current" : ""
                    }`}
                    key={key}
                    // TODO fix slider to move when this.state.currentItem changes
                    // onClick={()=>{this.handlerSliderItems(key)}}
                  >
                    {block.header}
                  </li>
                ))}
            </ul>
          </div>
          <div className="caseServices__content">
            <div className="caseServices__arrows">
              <div className="caseServices__arrow">
                <div className="sliderArrow _next">
                  <i className="sliderArrow__icon">
                    <Icon name="arrow-slider-next" />
                  </i>
                </div>
              </div>
              <div className="caseServices__arrow">
                <div className="sliderArrow _prev">
                  <i className="sliderArrow__icon">
                    <Icon name="arrow-slider-prev" />
                  </i>
                </div>
              </div>
            </div>
            <div
              className="caseServices__box"
              style={(currentEl && this.getStyleBox(currentEl.isShow)) || {}}
            >
              <div className="caseServices__items">
                {model.cards.map((card, key) => (
                  <div className="caseServices__item" key={key} data-key={key}>
                    <div
                      className={`caseServicesCard ${
                        items && items[key].isShow === true ? "_show" : ""
                      }`}
                    >
                      <div className="caseServicesCard__body">
                        <div className="caseServicesCard__head">
                          <div className="caseServicesCard__title">
                            <h3 className="title _mediumSizeTablet">
                              {card.header}
                            </h3>
                          </div>
                          <h4 className="textAnimate caseServicesCard__subTitle">
                            {card.sub_header}
                          </h4>
                        </div>
                        <div
                          className="caseServicesCard__content"
                          dangerouslySetInnerHTML={{
                            __html: setSpacesInText(card.description),
                          }}
                        ></div>
                      </div>

                      <div className="caseServicesCard__info">
                        <div className="caseServicesCard__infoHead">
                          {card.techs?.[0].name}
                          <div
                            className="caseServicesCard__infoAction"
                            onClick={() => this.handlerInfo("toggle", key)}
                          >
                            <i className="caseServicesCard__infoActionIcon">
                              <Icon name="plus" />
                            </i>
                          </div>
                        </div>
                        <div
                          className="caseServicesCard__infoContent"
                          style={
                            (items &&
                              items[key].isShow === true && {
                                height:
                                  this.parent.current
                                    .querySelector(
                                      `.caseServices__item[data-key="${key}"]`
                                    )
                                    .querySelector(
                                      ".caseServicesCard__infoContentInner"
                                    ).offsetHeight + 20,
                              }) ||
                            {}
                          }
                        >
                          <div className="caseServicesCard__infoContentInner">
                            {card.techs?.map((block, keyBlock) => (
                              <div
                                className="caseServicesCard__infoBlock"
                                key={keyBlock}
                              >
                                {/* <h4
                                  className="textAnimate caseServicesCard__infoBlockTitle"
                                  dangerouslySetInnerHTML={{
                                    __html: setSpacesInText(block.name),
                                  }}
                                ></h4> */}
                                <p
                                  className="textAnimate caseServicesCard__infoBlockText"
                                  dangerouslySetInnerHTML={{
                                    __html: setSpacesInText(block.value),
                                  }}
                                ></p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="caseServices__pagenation">
              <div className="pagenation"></div>
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

export default connect(mapStateToProps)(Services);
