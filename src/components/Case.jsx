import React, { Component } from "react";
import { connect } from "react-redux";

import setSpacesInText from "../functions/setSpacesInText";
import removeTransition from "../functions/removeTransition";
import Slider from "../functions/Slider";

import Icon from "./Icon.jsx";
import HandlerAnimate from "../classes/HandlerAnimate";
import Button from "./Button";
import CustomeLink from "./CustomeLink";
import LazyImage from "./LazyImage";
import handlerPopup from "../functions/handlerPopup";

class Case extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: 0,
    };

    this.renderContentItem = this.renderContentItem.bind(this);
    this.handlerTabs = this.handlerTabs.bind(this);
    this.setSlider = this.setSlider.bind(this);
    this.getContent = this.getContent.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
    this.renderName = this.renderName.bind(this);
    this.handlerLink = this.handlerLink.bind(this);
    this.handlerSwipe = this.handlerSwipe.bind(this);
    this.handlerSliderItems = this.handlerSliderItems.bind(this);

    this.parent = React.createRef();
  }

  renderContentItem(item, key) {
    const { model } = this.props;
    const { currentTab } = this.state;

    switch (item.type) {
      case "title":
        return (
          <div className="case__title" key={key}>
            <h3 className="title _tall _mediumSizeTablet">
              {item.items.map((el, keyEl) => {
                if (el.type === "text") {
                  return (
                    <span
                      className="title__elem _show"
                      key={keyEl}
                      dangerouslySetInnerHTML={{
                        __html: `${el.content}`,
                      }}
                    ></span>
                  );
                }
                if (el.type === "icon") {
                  return (
                    <i
                      className={`title__elem _icon _show title__icon ${el.class}`}
                    >
                      <img
                        src={require(`../img/emodzi/${el.content}`).default.src}
                        alt=""
                        className="title__iconItem"
                      />
                    </i>
                  );
                }
                return null;
              })}
            </h3>
          </div>
        );
      case "description":
        return (
          <p
            className="textAnimate1 case__description"
            key={key}
            dangerouslySetInnerHTML={{
              __html: setSpacesInText(item.content),
            }}
          ></p>
        );
      case "tabs":
        return (
          <div className="case__tabs" key={key}>
            {item.items.map((el, elKey) => (
              <label className="case__tab" key={elKey} data-key={elKey}>
                <input
                  type="radio"
                  className="case__tabInput"
                  checked={currentTab === el.key}
                  onChange={() => {
                    this.handlerTabs(el.key, elKey);
                  }}
                />
                <div
                  className="case__tabView"
                  dangerouslySetInnerHTML={{
                    __html: setSpacesInText(el.content),
                  }}
                ></div>
              </label>
            ))}
          </div>
        );
      case "list":
        return (
          <ul className="case__list" key={key}>
            {item.items.map((el, elKey) => (
              <li className="textAnimate1 case__listItem" key={elKey}>
                {el}
              </li>
            ))}
          </ul>
        );
      case "about":
        return (
          <p
            className="textAnimate1 case__about"
            key={key}
            dangerouslySetInnerHTML={{ __html: setSpacesInText(item.content) }}
          ></p>
        );
      case "price":
        return model.link ? (
          <CustomeLink
            href={model.link}
            classname="textAnimate1 case__price"
            key={key}
          >
            от <span>{item.price}</span> руб / <br className="_elemMobile" />{" "}
            {model.type !== "wide" && <br className="_elemDesktop" />}
            от <span>{item.duration}</span>
          </CustomeLink>
        ) : (
          <p
            className="textAnimate1 case__price"
            key={key}
            onClick={this.handlerLink}
          >
            от <span>{item.price}</span> руб / <br className="_elemMobile" />{" "}
            {model.type !== "wide" && <br className="_elemDesktop" />}
            от <span>{item.duration}</span>
          </p>
        );
      default:
        return null;
    }
  }

  handlerTabs(currentTab, key = null) {
    const { model } = this.props;

    if (key !== null) {
      const tabsScrollParent = this.parent.current.querySelector(".case__tabs");
      const tab = this.parent.current.querySelector(
        `.case__tab[data-key="${key}"]`
      );

      if (tab) {
        tabsScrollParent.scrollLeft = tab.offsetLeft - 20;
      }
    }

    removeTransition(".case__sliderItem");
    this.setState(
      (state) => {
        const newState = { ...state };

        newState.currentTab = currentTab;

        return newState;
      },
      () => {
        if (model.noSlider !== true) {
          this.setSlider();
        }
      }
    );
  }

  setSlider() {
    const { model } = this.props;
    const { isMulti } = model;
    const slider = this.parent.current.querySelector(".case__slider");
    const data =
      isMulti !== true
        ? { key: model.key, name: model.key }
        : { key: model.key };

    new Slider({
      slider,
      lay: slider.querySelector(".case__sliderItems"),
      items: slider.querySelectorAll(".case__sliderItem"),
      infinity: false,
      showEachSlide: true,
      current: 0,
      buttons: {
        prev: slider.querySelector(".sliderArrow._prev"),
        next: slider.querySelector(".sliderArrow._next"),
      },
      pagenation: {
        parent: slider.querySelector(".pagenation"),
        dot: "pagenation__item",
      },
      data,
    });
  }

  getContent() {
    const { currentTab } = this.state;
    const { model } = this.props;
    const { isMulti } = model;
    let firstName;

    if (isMulti === true) {
      Object.keys(model.content).forEach((prop) => {
        if (!firstName) {
          firstName = prop;
        }
      });
    }

    return (
      (isMulti === true &&
        (model.content[currentTab] || model.content[firstName])) ||
      model.content
    );
  }

  renderLogo() {
    const { currentTab, currentKey } = this.state;
    const { model } = this.props;
    const { isMulti } = model;

    return isMulti === true
      ? currentTab && model.items[currentTab].logo && (
          <div className="case__sliderLogo">
            {currentTab && (
              <img
                src={
                  require(`../img/projects/${model.items[currentTab].logo}`)
                    .default.src
                }
                alt=""
                className="case__sliderLogoImage"
              />
            )}
          </div>
        )
      : model.items &&
          model.items.map((item, key) => (
            <div
              className={`case__sliderLogo ${
                currentKey === key ? "_current" : ""
              }`}
              key={key}
            >
              <img
                src={require(`../img/projects/${item.logo}`).default.src}
                alt=""
                className="case__sliderLogoImage"
              />
            </div>
          ));
  }

  renderName() {
    const { currentTab, currentKey } = this.state;
    const { model } = this.props;
    const { isMulti } = model;

    return isMulti === true ? (
      <div className="case__sliderNames">
        {Object.keys(model.items).map(
          (prop) =>
            model.items[prop].name && (
              <p
                className={`case__sliderName ${
                  prop === currentTab ? "_current" : ""
                }`}
                key={prop}
                onClick={() => this.handlerTabs(prop)}
                dangerouslySetInnerHTML={{ __html: model.items[prop].name }}
              ></p>
            )
        )}
      </div>
    ) : (
      model.items &&
        model.items.map((item, key) => (
          <p
            className={`case__sliderName ${
              key === currentKey ? "_current" : ""
            }`}
            onClick={() => this.handlerTabs(key)}
            key={key}
            dangerouslySetInnerHTML={{ __html: item.name }}
          ></p>
        ))
    );
  }

  handlerSwipe() {
    const { model } = this.props;
    const info = this.parent.current.querySelector(".case__item._info");
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;
    let flagMove = true;
    let flagX = true;
    let flagY = true;

    info.querySelector(".case__tabs").addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
      },
      { passive: false }
    );

    info.querySelector(".case__tabs").addEventListener(
      "touchmove",
      (e) => {
        e.stopPropagation();
      },
      { passive: false }
    );

    info.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
    });

    info.addEventListener(
      "touchmove",
      (e) => {
        moveX = e.changedTouches[0].pageX - startX;
        moveY = e.changedTouches[0].pageY - startY;

        if (Math.abs(moveY) > 4 && flagY) {
          flagX = false;
        }

        if (Math.abs(moveX) > 4 && flagX) {
          flagY = false;
        }

        if (flagX && Math.abs(moveX) > 10 && flagMove) {
          e.preventDefault();

          flagMove = false;

          let current = model.tabs.findIndex(
            (tab) => tab.key === this.state.currentTab
          );

          if (moveX < 0 && current !== model.tabs.length - 1) {
            current += 1;
          }
          if (moveX > 0 && current !== 0) {
            current -= 1;
          }

          this.handlerTabs(model.tabs[current].key, current);
        }
      },
      { passive: false }
    );

    info.addEventListener("touchend", () => {
      flagX = true;
      flagY = true;

      flagMove = true;
    });
  }

  handlerSliderItems(e) {
    const { detail } = e;
    const { current, data } = detail;
    const { model } = this.props;

    if (data && data.name === model.key) {
      this.setState((state) => {
        const newState = { ...state };

        newState.currentKey = current;

        return newState;
      });
    }

    if (data && data.key === model.key && this.parent.current) {
      this.parent.current
        .querySelectorAll(".case__sliderItem")
        .forEach((item) => {
          const key = +item.getAttribute("data-id");

          item.removeAttribute("data-prev");

          if (current > key) {
            item.setAttribute("data-prev", true);
          }
        });
    }
  }

  handlerLink() {
    const { currentTab } = this.state;
    const { model, elements } = this.props;
    const { nameKey } = model;
    const nameType =
      currentTab &&
      model.tabs &&
      model.tabs.find((tab) => tab.key === currentTab).nameKey;

    const currentElement =
      elements && elements.find((el) => el.slug === nameKey);
    const currentType =
      currentElement &&
      currentElement.types.find((type) => type.slug === (nameType || nameKey));
    const serviceId = currentType && currentType.service_id;

    if (model.link) {
    } else if (serviceId) {
      document.dispatchEvent(
        new CustomEvent("showOrderFormOutside", { detail: { id: serviceId } })
      );
    }
  }

  handlerGalery({ items, src, current }) {
    const images = items.map((item) => ({ src: `${src}/${item.image}` }));

    handlerPopup("show", "galery", { images, current });
  }

  componentDidMount() {
    const { model } = this.props;
    const { isMulti, tabs } = model;

    this.handlerAnimate = new HandlerAnimate({
      type: "case",
      classParent: ".case",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    if (model) {
      if (isMulti === true) {
        this.handlerSwipe();

        this.setState(
          (state) => {
            const newState = { ...state };

            newState.currentTab = tabs[0].key;

            return newState;
          },
          () => {
            if (model.noSlider !== true) {
              this.setSlider();
            }
          }
        );
      } else {
        if (model.noSlider !== true) {
          this.setSlider();
        }
      }
      if (model.noSlider !== true) {
        document.addEventListener("change-slider", this.handlerSliderItems);
      }
    }
  }

  componentWillUnmount() {
    document.addEventListener("change-slider", this.handlerSliderItems);
  }

  render() {
    const { currentTab } = this.state;
    const { model, info } = this.props;
    const { type, caseKey, len, nextItem, handlerSlider } = info || {};
    const { isMulti, isEmpty } = model;
    const content = this.getContent();
    const items =
      (isMulti === true &&
        ((model.items[currentTab] && model.items[currentTab].items) || [])) ||
      model.items;

    return (
      <div
        ref={this.parent}
        className={`case _${model.key} ${
          (model.type && `_${model.type}`) || ""
        } ${isEmpty === true ? "_empty" : ""} ${
          isMulti === true ? "_multi" : ""
        } ${model.noSlider === true ? "_noSlider" : ""} _hide ${
          type ? `_${type}` : ""
        }`}
      >
        <div className="case__items">
          {type === "index" && (
            <div className="case__nav">
              <div className="caseNav">
                <div className="caseNav__arrows">
                  {["prev", "next"].map((name) => (
                    <div
                      key={name}
                      className={`caseNav__arrow _${name} ${
                        (caseKey === 0 && name === "prev") ||
                        (caseKey === len - 1 && name === "next")
                          ? "_disable"
                          : ""
                      }`}
                      onClick={() => {
                        handlerSlider(name);
                      }}
                    >
                      <i className="caseNav__arrowIcon">
                        <Icon name={`arrow-cases-${name}`} />
                      </i>
                    </div>
                  ))}
                </div>
                <div className="caseNav__content">{nextItem}</div>
              </div>
            </div>
          )}
          <div className="case__item _info">
            {model.title &&
              this.renderContentItem({ type: "title", items: model.title })}
            {model.description &&
              this.renderContentItem({
                type: "description",
                content: model.description,
              })}
            {model.tabs &&
              this.renderContentItem({
                type: "tabs",
                items: model.tabs,
              })}
            {content.map((item, key) => this.renderContentItem(item, key))}
            {(model.link && (
              <CustomeLink href={model.link} classname="case__button">
                <Button classes="_main _mobileEmpty" content="Подробнее" />
              </CustomeLink>
            )) || (
              <div className="case__button" onClick={this.handlerLink}>
                <Button classes="_main _mobileEmpty" content="Подробнее" />
              </div>
            )}
          </div>
          <div className="case__item _previews">
            <div className="case__itemBack"></div>
            {model.noSlider !== true ? (
              <div className="case__slider">
                {this.renderLogo()}
                {this.renderName()}
                <div className="case__sliderBox" key={currentTab}>
                  <div className="case__sliderPagenation">
                    <div className="pagenation"></div>
                  </div>
                  <div className="case__sliderArrows">
                    <div className="case__sliderArrow">
                      <div className="sliderArrow _next">
                        <i className="sliderArrow__icon">
                          <Icon name="arrow-slider-next" />
                        </i>
                      </div>
                    </div>
                    <div className="case__sliderArrow">
                      <div className="sliderArrow _prev">
                        <i className="sliderArrow__icon">
                          <Icon name="arrow-slider-prev" />
                        </i>
                      </div>
                    </div>
                  </div>

                  <div className="case__sliderItems">
                    {items.map((sliderItem, keySlider) => (
                      <div
                        className="case__sliderItem"
                        key={keySlider}
                        onClick={() =>
                          this.handlerGalery({
                            items,
                            src: `cases`,
                            current: keySlider,
                          })
                        }
                      >
                        <LazyImage
                          src={
                            require(`../img/cases/${sliderItem.image}`).default
                              .src
                          }
                          className="case__sliderItemImage"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="case__images">
                <div className="case__imagesBox">
                  {model.items.map((item, key) => (
                    <div
                      className={`case__imagesItem  _${item.key} ${
                        currentTab === item.key || model.items.length === 1
                          ? "_current"
                          : ""
                      }`}
                      key={key}
                    >
                      <LazyImage
                        src={require(`../img/cases/${item.image}`).default.src}
                        className="case__image"
                      />

                      {item.name && (
                        <p
                          className="case__imagesItemName"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        ></p>
                      )}
                    </div>
                  ))}
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
  };
}

export default connect(mapStateToProps)(Case);
