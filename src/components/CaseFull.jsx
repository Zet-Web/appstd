import React, { Component } from "react";
import { connect } from "react-redux";

import LinkArrow from "./LinkArrow.jsx";
import Icon from "./Icon.jsx";

import Slider from "../functions/Slider.js";
import setSpacesInText from "../functions/setSpacesInText.js";
import getFormatedPrice from "../functions/getFormatedPrice.js";
import hexToRgb from "../functions/hexToRgb.js";
import HandlerAnimate from "../classes/HandlerAnimate.js";
import handlerPopup from "../functions/handlerPopup.js";

const categories = require("../info/caseCategories.json");

class CaseFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: 0,
    };

    this.getImages = this.getImages.bind(this);
    this.handlerSliderItems = this.handlerSliderItems.bind(this);
    this.handlerGalery = this.handlerGalery.bind(this);

    this.parent = React.createRef();
  }

  links = {
    app: {
      icon: "apple-link.svg",
      key: "app_store",
      keyText: "app_store_text_not_url",
    },
    google: {
      icon: "google-link.svg",
      key: "google_play",
      keyText: "google_play_text_not_url",
    },
  };

  setSlider() {
    const { model } = this.props;
    const slider = this.parent.current.querySelector(".caseFull__slider");

    new Slider({
      slider,
      lay: slider.querySelector(".caseFull__sliderItems"),
      items: slider.querySelectorAll(".caseFull__sliderItem"),
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
      data: {
        id: model.id,
      },
    });
  }

  handlerSliderItems(e) {
    const { detail } = e;
    const { current, data } = detail;
    const { model } = this.props;

    // console.log(data)

    if (data && data.id === model.id) {
      this.setState((state) => {
        const newState = { ...state };

        newState.currentKey = current;

        return newState;
      });
    }
  }

  renderLink() {
    const { model } = this.props;

    return (
      model.url_more && <LinkArrow href={model.url_more} content="Подробнее" />
    );
  }

  getImages() {
    const { model } = this.props;

    if (model) {
      if (model.images) {
        return [
          { image: model.image, image_title: model.image_title },
          ...model.images,
        ];
      }

      return [{ image: model.image, image_title: model.image_title }];
    }

    return [];
  }

  handlerGalery(current) {
    handlerPopup("show", "galery", {
      images: this.getImages().map((item) => ({
        src: item.image,
        isGlobal: true,
      })),
      current,
    });
  }

  handlerPopup(info) {
    handlerPopup("show", "portfolioPopup", info);
  }

  componentDidMount() {
    const { model } = this.props;

    if (model && this.getImages().length) {
      this.setSlider();
    }

    this.handlerAnimate = new HandlerAnimate({
      type: "case",
      classParent: ".caseFull",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.handlerAnimateText = new HandlerAnimate({
      type: "text",
      classParent: ".textAnimate",
      parent: this.parent.current,
    });

    this.handlerAnimateText.init();
    this.handlerAnimateText.handler();

    document.addEventListener("change-slider", this.handlerSliderItems);
  }

  componentWillUnmount() {
    document.addEventListener("change-slider", this.handlerSliderItems);
  }

  render() {
    const { currentKey } = this.state;
    const { device, model } = this.props;
    const rgb = hexToRgb(model.color);

    return (
      <div ref={this.parent} className="caseFull _hide">
        <div
          className="caseFull__back"
          style={{ background: `rgba(${rgb.r},${rgb.g},${rgb.b},.3)` }}
        />
        <div className="caseFull__items">
          <div className="caseFull__item _info">
            <div className="caseFull__types">
              <div className="textAnimate caseFull__type">
                {model.labels[0]?.name}
              </div>
              <div className="textAnimate caseFull__type _min">
                {categories[model.category]?.content || model.category}
              </div>
            </div>
            <div className="caseFull__info">
              <div className="textAnimate caseFull__title">
                <h2 className="title _mediumSizeTablet">{model.name}</h2>
              </div>
              {model.description && (
                <p
                  className="textAnimate caseFull__about"
                  dangerouslySetInnerHTML={{
                    __html: setSpacesInText(
                      model.description.replace(/\n/g, "<br/>")
                    ),
                  }}
                />
              )}
            </div>
            <p className="textAnimate caseFull__price">
              от <span>{getFormatedPrice(model.price)}</span> руб.
            </p>
            <div className="caseFull__tags">
              {model.tags.map((tag, key) => (
                <div className="textAnimate caseFull__tag" key={key}>
                  {tag.name}
                </div>
              ))}
            </div>
            {device === "desktop" && this.renderLink()}
          </div>
          <div className="caseFull__item _previews">
            <div className="caseFull__slider">
              <div className="caseFull__sliderLogo">
                <img
                  src={model.icon}
                  alt=""
                  className="caseFull__sliderLogoIcon"
                />
              </div>
              <div className="caseFull__sliderLinks">
                {["app", "google"].map((name) => (
                  <a
                    href={model[this.links[name].key]}
                    className={`caseFull__sliderLink ${
                      !model[this.links[name].key] ? "_dis" : ""
                    }`}
                    target="_blank"
                    key={name}
                    onClick={(e) => {
                      if (!model[this.links[name].key]) {
                        e.preventDefault();
                        if (model[this.links[name].keyText]) {
                          this.handlerPopup({
                            title: model.name,
                            description: model[this.links[name].keyText],
                          });
                        }
                      }
                    }}
                  >
                    <img
                      src={
                        require(`../img/${this.links[name].icon}`).default.src
                      }
                      alt=""
                      className="caseFull__sliderLinkImage"
                    />
                  </a>
                ))}
              </div>
              <p className="caseFull__sliderName">
                {
                  this.getImages().find((item, key) => key === currentKey)
                    .image_title
                }
              </p>
              <div className="caseFull__sliderItems">
                {this.getImages().map((item, key) => (
                  <div className="caseFull__sliderItem" key={key}>
                    <img
                      src={item.image}
                      alt={item.image_title}
                      className="caseFull__sliderImage"
                      onClick={() => {
                        this.handlerGalery(key);
                      }}
                    />
                  </div>
                ))}
              </div>
              {this.getImages().length > 1 && (
                <div className="caseFull__sliderArrows">
                  <div className="caseFull__sliderArrow">
                    <div className="sliderArrow _next">
                      <i className="sliderArrow__icon">
                        <Icon name="arrow-slider-next" />
                      </i>
                    </div>
                  </div>
                  <div className="caseFull__sliderArrow">
                    <div className="sliderArrow _prev">
                      <i className="sliderArrow__icon">
                        <Icon name="arrow-slider-prev" />
                      </i>
                    </div>
                  </div>
                </div>
              )}
              <div className="caseFull__sliderPagenation">
                <div className="pagenation"></div>
              </div>
            </div>
            {device === "mobile" && this.renderLink()}
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

export default connect(mapStateToProps)(CaseFull);
