import React, { Component } from "react";
import { connect } from "react-redux";

import Icon from "./Icon";
import Slider from "../functions/Slider";
import handlerPopup from "../functions/handlerPopup";

class Galery extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setSlider = this.setSlider.bind(this);
    this.handlerMissClick = this.handlerMissClick.bind(this);

    this.parent = React.createRef();
  }

  setSlider() {
    const { galery } = this.props;
    const { current } = galery;
    const slider = this.parent.current.querySelector(".galery");

    new Slider({
      slider,
      lay: slider.querySelector(".galery__items"),
      items: slider.querySelectorAll(".galery__item"),
      infinity: false,
      showEachSlide: true,
      current: +current,
      buttons: {
        prev: slider.querySelector(".sliderArrow._prev"),
        next: slider.querySelector(".sliderArrow._next"),
      },
      pagenation: {
        parent: slider.querySelector(".pagenation"),
        dot: "pagenation__item",
      },
    });
  }

  handlerMissClick(e) {
    const footer = this.parent.current.querySelector(".galery__footer");
    let condForClose = true;

    this.parent.current
      .querySelectorAll(".galery__itemImage")
      .forEach((image) => {
        condForClose = condForClose && e.target !== image;
      });

    if (footer && (e.target === footer || footer.contains(e.target))) {
      condForClose = false;
    }

    if (condForClose) {
      handlerPopup("hide", "galery");
    }
  }

  componentDidMount() {
    const { galery } = this.props;
    const { images } = galery;

    if (images.length > 1) {
      this.setSlider();
    }

    setTimeout(() => {
      document.addEventListener("click", this.handlerMissClick);
    }, 10);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handlerMissClick);
  }

  render() {
    const { galery } = this.props;
    const { images } = galery;

    return (
      <div
        ref={this.parent}
        className={`body__galery ${galery.state === 1 ? "_show" : ""}`}
      >
        <div className="galery">
          <i
            className="galery__close"
            onClick={() => {
              handlerPopup("hide", "galery");
            }}
          >
            <Icon name="close" />
          </i>
          <div className="galery__inner">
            <div className="galery__items">
              {images.map((image, key) => (
                <div className="galery__item" key={key}>
                  <img
                    src={
                      image.isGlobal
                        ? image.src
                        : require(`../img/${image.src}`).default.src
                    }
                    alt=""
                    className="galery__itemImage"
                  />
                </div>
              ))}
            </div>
          </div>
          {images.length > 1 && (
            <div className="galery__footer">
              <div className="galery__arrow">
                <div className="sliderArrow _prev">
                  <i className="sliderArrow__icon">
                    <Icon name="arrow-slider-prev" />
                  </i>
                </div>
              </div>
              <div className="galery__pagenation">
                <div className="pagenation _light"></div>
              </div>
              <div className="galery__arrow">
                <div className="sliderArrow _next">
                  <i className="sliderArrow__icon">
                    <Icon name="arrow-slider-next" />
                  </i>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    galery: state.galery,
  };
}

export default connect(mapStateToProps)(Galery);
