import React, { Component } from "react";

import Icon from "./Icon.jsx";

const getFormatedNumber = (num) =>
  parseInt(num / 10, 10) < 1 ? `0${num}` : num;

class TimeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };

    this.handlerClickOutside = this.handlerClickOutside.bind(this);

    this.parent = React.createRef();

    this.dropList = [];

    for (let i = 0; i < 48; i++) {
      const hour = parseInt(i / 2);

      this.dropList.push({
        key: i,
        value: `${getFormatedNumber(hour)}:${i % 2 === 0 ? "00" : "30"}`,
      });
    }
  }

  dropList = null;

  isInitScroll = false;

  handlerShow(isShow = !this.state.isShow) {
    this.setState(
      (state) => {
        const newState = { ...state };

        newState.isShow = isShow;

        return newState;
      },
      () => {
        const { value } = this.props;

        if (value !== null && !this.isInitScroll) {
          this.isInitScroll = true;
          const findKey = this.dropList.findIndex(
            (item) => +item.key === +value
          );
          const currentElem = this.parent.current.querySelector(
            `.timeSelect__dropItem[data-key="${findKey}"]`
          );

          this.parent.current.querySelector(".timeSelect__drop").scrollTop =
            currentElem.offsetTop;
        }
      }
    );
  }

  handlerClickOutside(e) {
    const { isShow } = this.state;

    if (
      isShow === true &&
      e.target !== this.parent.current &&
      !this.parent.current.contains(e.target)
    ) {
      this.handlerShow(false);
    }
  }

  componentDidMount() {
    const { name, value, handler } = this.props;

    if (value !== null) {
      const findKey = this.dropList.findIndex((item) => +item.key === +value);

      handler({ name, key: value, value: this.dropList[findKey].value });
    }

    document.addEventListener("click", this.handlerClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handlerClickOutside);
  }

  render() {
    const { isShow } = this.state;
    const { name, handler, value, isError } = this.props;

    return (
      <div
        ref={this.parent}
        className={`timeSelect ${isShow === true ? "_show" : ""} ${
          (isError && "_error") || ""
        }`}
      >
        <div className="timeSelect__view" onClick={() => this.handlerShow()}>
          {(this.dropList &&
            this.dropList.find((item) => item.key === value)?.value) ||
            "–"}
          <i className="timeSelect__viewIcon">
            <Icon name="select" />
          </i>
        </div>
        <div className={`timeSelect__drop`}>
          {this.dropList &&
            this.dropList
              .filter((item) => item.key !== value)
              .map((item, key) => (
                <div
                  className="timeSelect__dropItem"
                  key={key}
                  data-key={key}
                  onClick={() => {
                    handler({ name, key: item.key, value: item.value });
                    this.handlerShow(false);
                  }}
                >
                  {item.value}
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default TimeSelect;
