import React, { Component } from "react";
import PropTypes from "prop-types";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
    };

    this.handlerFocus = this.handlerFocus.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.getId = this.getId.bind(this);

    this.parent = React.createRef();
  }

  handlerFocus(isFocus) {
    this.setState((state) => {
      const newState = { ...state };

      newState.isFocus = isFocus;

      return newState;
    });
  }

  setHeight() {
    const { model } = this.props;
    const { tag } = model;

    if (tag === "area") {
      const area = this.parent.current.querySelector(".field__input");

      area.style.height = "auto";
      area.style.height = area.scrollHeight + "px";
    }
  }

  getId() {
    const { model } = this.props;
    const { key } = model;

    return `input-${key}`;
  }

  render() {
    const { isFocus } = this.state;
    const { model, callback, error } = this.props;
    const { tag, value, key, isRequired } = model;

    return (
      <div
        ref={this.parent}
        className={`field _${tag} ${
          isFocus === true || value ? "_active" : ""
        } ${isFocus === true ? "_focus" : ""} ${model.classes} ${
          error ? "_error" : ""
        }`}
      >
        <label className="field__support" htmlFor={this.getId()}>
          {model.support}
          {isRequired === true ? <span>*</span> : null}
        </label>
        <div className="field__box">
          {error && <div className="field__error">{error}</div>}
          {tag === "input" && (
            <input
              type="text"
              className="field__input"
              value={value || ``}
              id={this.getId()}
              onFocus={() => {
                this.handlerFocus(true);
              }}
              onBlur={() => {
                this.handlerFocus(false);
              }}
              onChange={(e) => {
                callback({ key, value: e.target.value });
              }}
            />
          )}
          {tag === "area" && (
            <textarea
              type="text"
              className="field__input"
              value={value || ``}
              id={this.getId()}
              onFocus={() => {
                this.handlerFocus(true);
              }}
              onBlur={() => {
                this.handlerFocus(false);
              }}
              onChange={(e) => {
                callback({ key, value: e.target.value });
                this.setHeight();
              }}
            ></textarea>
          )}
        </div>
      </div>
    );
  }
}

export default Field;

Field.propTypes = {
  model: PropTypes.object,
  callback: PropTypes.func,
  error: PropTypes.string,
};
