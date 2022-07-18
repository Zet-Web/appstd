import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.parent = React.createRef();
  }

  intervalId = null;
  timerId = null;
  scale = 0;
  isStart = false;
  isHover = false;

  handlerHover(action) {
    const back = this.parent.current.querySelector(".button__back");

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return false;
    }

    switch (action) {
      case "start":
        this.isHover = true;
        if (this.isStart === false) {
          this.isStart = true;
          this.intervalId = setInterval(() => {
            let k = 0;
            if (this.scale < 1.4) {
              k += 0.02;
              this.scale += 0.01 + k;
              back.style.transform = `translate(-50%,-50%) scale(${this.scale})`;
            }
          }, 20);
        }

        break;
      case "stop":
        this.isHover = false;
        if (this.intervalId && this.isStart === true) {
          clearInterval(this.intervalId);
          back.classList.add("_hide");
          this.timerId = setTimeout(() => {
            this.scale = 0;
            back.style.transform = `translate(-50%,-50%) scale(${this.scale})`;
            back.classList.remove("_hide");
            this.isStart = false;
            clearInterval(this.intervalId);
            if (this.isHover) {
              this.handlerHover("start");
            }
          }, 500);
        }
        break;
      default:
        break;
    }

    return true;
  }

  render() {
    const { classes, content } = this.props;

    return (
      <div
        ref={this.parent}
        className={`button ${classes || ""}`}
        onMouseEnter={() => this.handlerHover("start")}
        onMouseLeave={() => this.handlerHover("stop")}
      >
        <div className="button__back"></div>
        {content}
      </div>
    );
  }
}

export default Button;
