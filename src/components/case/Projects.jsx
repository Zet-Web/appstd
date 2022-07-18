import React, { Component } from "react";
import axios from "axios";

import Icon from "../../components/Icon";
import Slider from "../../functions/Slider";
import HandlerAnimate from "../../classes/HandlerAnimate";
import CaseProject from "../CaseProject";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: null,
    };

    this.getCases = this.getCases.bind(this);
    this.handlerSliderItems = this.handlerSliderItems.bind(this);

    this.parent = React.createRef();
  }

  setSlider() {
    const slider = this.parent.current.querySelector(".caseProjects__slider");

    new Slider({
      slider,
      lay: slider.querySelector(".caseProjects__items"),
      items: slider.querySelectorAll(".caseProjects__item"),
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
      data: { name: "caseProjects" },
    });
  }

  handlerSliderItems(e) {
    const { detail } = e;
    const { current, data } = detail;

    if (data && data.name === "caseProjects") {
      this.parent.current
        .querySelectorAll(".caseProjects__item")
        .forEach((item) => {
          const key = +item.getAttribute("data-id");

          item.removeAttribute("data-prev");

          if (current > key) {
            item.setAttribute("data-prev", true);
          }
        });
    }
  }

  getCases() {
    const { category } = this.props;

    axios
      .get(`https://api.appsstudio.ru/v1/portfolio/?category=${category}`)
      .then(
        (res) => {
          const { items: cases } = res.data;

          this.setState(
            (state) => {
              const newState = { ...state };

              newState.cases = cases;

              return newState;
            },
            () => {
              if (cases.length) {
                this.setSlider();
                document.addEventListener(
                  "change-slider",
                  this.handlerSliderItems
                );
              }
            }
          );
        },
        () => {}
      );
  }

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.getCases();
  }

  componentWillUnmount() {
    document.removeEventListener("change-slider", this.handlerSliderItems);
  }

  render() {
    const { cases } = this.state;
    const { titleIcon } = this.props;

    return (
      <div
        ref={this.parent}
        className={`caseProjects`}
        style={cases && cases.length === 0 ? { display: "none" } : {}}
      >
        <div className="caseProjects__inner">
          <div className="caseProjects__content">
            <div className="caseProjects__title">
              <h2 className="title _mediumSizeTablet">
                <span className="title__elem">Реализованные</span>
                {`  `}
                <span className="title__elem">проекты</span>
                <i className={`title__elem _icon title__icon _icon11`}>
                  <img
                    src={
                      require(`../../img/emodzi/${
                        titleIcon || `emodzi-11.png`
                      }`).default.src
                    }
                    alt=""
                    className="title__iconItem"
                  />
                </i>
              </h2>
            </div>
            <div className="caseProjects__slider">
              <div className="caseProjects__sliderArrows">
                <div className="caseProjects__sliderArrow">
                  <div className="sliderArrow _next">
                    <i className="sliderArrow__icon">
                      <Icon name="arrow-slider-next" />
                    </i>
                  </div>
                </div>
                <div className="caseProjects__sliderArrow">
                  <div className="sliderArrow _prev">
                    <i className="sliderArrow__icon">
                      <Icon name="arrow-slider-prev" />
                    </i>
                  </div>
                </div>
              </div>
              <div className="caseProjects__sliderPagenation">
                <div className="pagenation"></div>
              </div>
              <div className="caseProjects__box">
                <div className="caseProjects__items">
                  {cases &&
                    cases.map((card, key) => (
                      <div className="caseProjects__item" key={key}>
                        <CaseProject card={{ ...card, type: "api" }} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
