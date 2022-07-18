import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Icon from "../Icon.jsx";
import handlerPopup from "../../functions/handlerPopup";
import Button from "../Button.jsx";

class ErrorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlerMissClick = this.handlerMissClick.bind(this);

    this.parent = React.createRef();
  }

  handlerMissClick(e) {
    const inner = this.parent.current.querySelector(".popup__inner");

    if (e.target !== inner && !inner.contains(e.target)) {
      handlerPopup("hide", "successForm");
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handlerMissClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handlerMissClick);
  }

  render() {
    const { errorForm } = this.props;

    return (
      <div ref={this.parent} className="popup _errorForm">
        <div className="popup__inner">
          <div
            className="popup__close"
            onClick={() => {
              handlerPopup("hide", "errorForm");
            }}
          >
            <i className="popup__closeIcon">
              <Icon name="close" />
            </i>
          </div>
          <h3 className="popup__title">
            При отправке данных произошел сбой, Вы можете повторить отправку
            сейчас, либо попробовать позже
          </h3>
          <div className="popup__buttons">
            <div
              className="popup__button"
              onClick={() => {
                handlerPopup("hide", "errorForm");
              }}
            >
              <Button classes="_darkEmpty" content="Попробую позже" />
            </div>
            <div
              className="popup__button"
              onClick={() => {
                errorForm.callback();
              }}
            >
              <Button classes="_main" content="Повторить отправку" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ErrorForm.propTypes = {
  icon: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    errorForm: state.errorForm,
  };
}

export default connect(mapStateToProps)(ErrorForm);
