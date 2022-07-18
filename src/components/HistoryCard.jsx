import React, { Component } from "react";
import { connect } from "react-redux";

import Icon from "./Icon";
import setSpacesInText from "../functions/setSpacesInText";
import getElemsFromString from "../functions/getElemsFromString";

class HistoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };

    this.handlerYears = this.handlerYears.bind(this);

    this.parent = React.createRef();
  }

  intervalId = null;
  valueOne = 0;
  valueTwo = 0;
  isLeave = false;
  isMove = false;

  handlerYears(action) {
    const widthYear =
      this.parent.current.querySelector(".aboutHistory__cardYear").clientWidth +
      32;

    const oneItem = this.parent.current.querySelector(
      ".aboutHistory__cardYearItem._one"
    );

    const twoItem = this.parent.current.querySelector(
      ".aboutHistory__cardYearItem._two"
    );

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return false;
    }

    switch (action) {
      case "enter":
        this.setState((state) => {
          const newState = { ...state };

          newState.isHover = true;

          return newState;
        });

        this.isLeave = false;

        if (this.isMove === false) {
          this.isMove = true;

          this.intervalId = setInterval(() => {
            if (this.valueOne > widthYear || this.valueTwo > widthYear * 2) {
              if (this.isLeave === true) {
                clearInterval(this.intervalId);
                this.isMove = false;
                this.isLeave = false;
                this.valueOne = 0;
                this.valueTwo = 0;
              }
            }

            if (this.isMove === true) {
              if (this.valueOne > widthYear) {
                this.valueOne = -widthYear;
              }
              if (this.valueTwo > widthYear * 2) {
                this.valueTwo = 0;
              }

              this.valueOne += 3;
              this.valueTwo += 3;
            }
            oneItem.style.transform = `translate3d(${-this.valueOne}px,0,0)`;
            twoItem.style.transform = `translate3d(${-this.valueTwo}px,0,0)`;
          }, 20);
        }

        break;
      case "leave":
        this.setState((state) => {
          const newState = { ...state };

          newState.isHover = false;

          return newState;
        });

        if (this.isLeave === false) {
          this.isLeave = true;
        }

        break;
      default:
        break;
    }
  }

  render() {
    const { isHover } = this.state;
    const { card, stateCard, handlerCard, parent } = this.props;

    return (
      <div
        ref={this.parent}
        className={`aboutHistory__card ${
          stateCard.isOpen === true ? "_open" : ""
        }`}
        data-key={card.year}
      >
        <div
          className="aboutHistory__cardHead"
          onMouseEnter={() => this.handlerYears("enter")}
          onMouseLeave={() => this.handlerYears("leave")}
          onClick={() => handlerCard(card.year)}
          style={
            ((stateCard.isOpen === true || isHover === true) && {
              background: card.background,
            }) ||
            {}
          }
        >
          <div className="aboutHistory__cardYear">
            <div className="aboutHistory__cardYearInner">
              <div className="aboutHistory__cardYearItem _one">{card.year}</div>
              <div className="aboutHistory__cardYearItem _two">{card.year}</div>
            </div>
          </div>
          <h3
            className="aboutHistory__cardTitle"
            dangerouslySetInnerHTML={{
              __html: setSpacesInText(card.header),
            }}
          ></h3>
          <div className="aboutHistory__cardBtn">
            <i className="aboutHistory__cardBtnIcon">
              <Icon name="plus" />
            </i>
          </div>
        </div>
        <div
          className="aboutHistory__cardDrop"
          style={
            stateCard.isOpen === true
              ? {
                  height: parent.current
                    .querySelector(
                      `.aboutHistory__card[data-key="${card.year}"]`
                    )
                    .querySelector(".aboutHistory__cardDropInner").offsetHeight,
                }
              : {}
          }
        >
          <div className="aboutHistory__cardDropInner">
            {getElemsFromString(card.description).map((item, key) => (
              <p
                key={key}
                dangerouslySetInnerHTML={{ __html: setSpacesInText(item) }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HistoryCard);
