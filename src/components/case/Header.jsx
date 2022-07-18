import React, { Component } from "react";
import { connect } from "react-redux";

import setSpacesInText from "../../functions/setSpacesInText";

import HeadPagenation from "../../components/HeadPagenation.jsx";
import HandlerAnimate from "../../classes/HandlerAnimate";
import hexToRgb from "../../functions/hexToRgb";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimate: false,
    };

    this.paralaxAnimate = this.paralaxAnimate.bind(this);

    this.parent = React.createRef();
  }

  isInitOptions = false;

  animateOptions() {
    const { headers } = this.props;

    if (!this.isInitOptions && headers) {
      this.isInitOptions = true;
      this.handlerAnimateStats = new HandlerAnimate({
        type: "statsItems",
        parent: this.parent.current,
        classParent: ".caseHeader__optionInner",
      });

      this.handlerAnimateStats.init();
      setTimeout(() => {
        this.handlerAnimateStats.handler();
      }, 700);
    }
  }

  paralaxAnimate(e) {
    const { startPositionCursor } = this.props;
    const { x, y, isInit } = startPositionCursor;

    let { clientX, clientY } = e;
    clientX -= x || 0;
    clientY -= y || 0;

    if (isInit) {
      this.parent.current.querySelector(
        ".caseHeader__backBgInner"
      ).style.transform = `translate3d(${(1 * clientX) / 75}px,${
        (-1 * clientY) / 75
      }px,0)`;

      this.parent.current.querySelector(
        ".caseHeader__backItemInner"
      ).style.transform = `translate3d(${(-1 * clientX) / 75}px,${
        (1 * clientY) / 75
      }px,0)`;
    }
  }

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
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

    this.animateOptions();

    setTimeout(() => {
      this.setState((state) => {
        const newState = { ...state };

        newState.isAnimate = true;

        return newState;
      });
    }, 100);

    document.addEventListener("mousemove", this.paralaxAnimate);
  }

  componentDidUpdate() {
    this.animateOptions();
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.paralaxAnimate);
  }

  render() {
    const { isAnimate } = this.state;
    const { model, headers } = this.props;

    return (
      <div
        ref={this.parent}
        className={`caseHeader _${model.key} ${
          isAnimate === true ? "_isAnimate" : ""
        }`}
      >
        <div className="caseHeader__back">
          <div className="caseHeader__backBg">
            <div className="caseHeader__backBgInner"></div>
          </div>
          <div className="caseHeader__backItem">
            <img
              src={require(`../../img/${model.back}`).default.src}
              alt=""
              className="caseHeader__backItemInner"
            />
          </div>
        </div>

        <div className="caseHeader__pagenation">
          <HeadPagenation items={model.items} />
        </div>
        <div className="caseHeader__inner">
          <div className="caseHeader__content">
            <div className="caseHeader__title">
              <h1
                className="title _tall"
                dangerouslySetInnerHTML={{ __html: model.title }}
              ></h1>
            </div>
            <p
              className="textAnimate caseHeader__description"
              dangerouslySetInnerHTML={{
                __html: setSpacesInText(model.description),
              }}
            ></p>
          </div>
          <div className="caseHeader__options">
            {headers &&
              headers.map((option, key) => {
                const rgb = hexToRgb(option.color);

                return (
                  <div className={`caseHeader__option`} key={key}>
                    <div className="caseHeader__optionInner">
                      <div
                        className="caseHeader__optionBack"
                        style={{
                          background: `rgba(${rgb.r},${rgb.g},${rgb.b},.1)`,
                        }}
                      ></div>
                      <h3 className="caseHeader__optionTitle">
                        {option.header}
                      </h3>
                      <p
                        className="caseHeader__optionDescription"
                        dangerouslySetInnerHTML={{
                          __html: setSpacesInText(option.description),
                        }}
                      ></p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    startPositionCursor: state.startPositionCursor,
  };
}

export default connect(mapStateToProps)(Header);
