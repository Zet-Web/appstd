import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Icon from "../Icon.jsx";
import setSpacesInText from "../../functions/setSpacesInText.js";
import handlerPopup from "../../functions/handlerPopup.js";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlerMissClick = this.handlerMissClick.bind(this);

    this.parent = React.createRef();
  }

  handlerMissClick(e) {
    const inner = this.parent.current.querySelector(".stagesInfo__inner");

    if (e.target !== inner && !inner.contains(e.target)) {
      handlerPopup("hide", "portfolioPopup");
    }
  }

  componentDidMount() {
    setTimeout(() => {
      document.addEventListener("click", this.handlerMissClick);
      document.addEventListener("touchstart", this.handlerMissClick);
    }, 10);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handlerMissClick);
    document.removeEventListener("touchstart", this.handlerMissClick);
  }

  render() {
    const { device, portfolioPopup } = this.props;
    const { title, description } = portfolioPopup;

    return (
      <div ref={this.parent} className="stagesInfo">
        <div
          className="stagesInfo__inner"
          style={
            (process.browser &&
              device === "mobile" && {
                height: document.documentElement.clientHeight,
              }) ||
            {}
          }
        >
          <div
            className="stagesInfo__close"
            onClick={() => handlerPopup("hide", "portfolioPopup")}
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
                  __html: setSpacesInText(title),
                }}
              ></h3>
              <div
                className="stagesInfo__texts"
                dangerouslySetInnerHTML={{
                  __html: setSpacesInText(description),
                }}
              ></div>
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
    portfolioPopup: state.portfolioPopup,
  };
}

export default connect(mapStateToProps)(Popup);

Popup.propTypes = {
  portfolioPopup: PropTypes.object,
};
