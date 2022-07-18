import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Icon from "../Icon.jsx";
import setSpacesInText from "../../functions/setSpacesInText.js";

class StagesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlerMissClick = this.handlerMissClick.bind(this);
    this.setHeightInner = this.setHeightInner.bind(this);

    this.parent = React.createRef();
  }

  handlerMissClick(e) {
    const { handlerInfo } = this.props;
    const inner = this.parent.current.querySelector(".stagesInfo__inner");

    if (e.target !== inner && !inner.contains(e.target)) {
      handlerInfo("hide");
    }
  }

  setHeightInner() {
    const { device } = this.props;

    if (device === "mobile") {
      this.parent.current.querySelector(
        `.stagesInfo__inner`
      ).style.height = `${document.documentElement.clientHeight}px`;

      setTimeout(() => {
        this.parent.current.querySelector(
          `.stagesInfo__inner`
        ).style.height = `${document.documentElement.clientHeight}px`;
      }, 10);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      document.addEventListener("click", this.handlerMissClick);
      document.addEventListener("touchstart", this.handlerMissClick);
    }, 10);

    this.setHeightInner();

    window.addEventListener("resize", this.setHeightInner);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handlerMissClick);
    document.removeEventListener("touchstart", this.handlerMissClick);
    window.removeEventListener("resize", this.setHeightInner);
  }

  render() {
    const { handlerInfo, dataKey } = this.props;

    return (
      <div ref={this.parent} className="stagesInfo">
        <div className="stagesInfo__inner">
          <div
            className="stagesInfo__close"
            onClick={() => handlerInfo("hide")}
          >
            <div className="stagesInfo__closeIcon">
              <Icon name="close" />
            </div>
          </div>
          <div className="stagesInfo__box">
            <div className="stagesInfo__content">
              <h3
                className="stagesInfo__title"
                dangerouslySetInnerHTML={{
                  __html: setSpacesInText(dataKey.title),
                }}
              ></h3>
              <div
                className="stagesInfo__texts"
                dangerouslySetInnerHTML={{
                  __html: setSpacesInText(dataKey.content),
                }}
              ></div>
            </div>
            {dataKey.url && (
              <div className="stagesInfo__foot">
                <a
                  href={dataKey.url}
                  target="_blank"
                  className="stagesInfo__link"
                >
                  Пример данного этапа работ
                </a>
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

export default connect(mapStateToProps)(StagesInfo);

StagesInfo.propTypes = {
  handlerInfo: PropTypes.func,
  dataKey: PropTypes.string,
};
