import React, { Component } from "react";
import { connect } from "react-redux";

import HandlerAnimate from "../classes/HandlerAnimate.js";
import LinkArrow from "./LinkArrow.jsx";
import hexToRgb from "../functions/hexToRgb.js";
import getFormatedPrice from "../functions/getFormatedPrice.js";
import { dispatcher } from "../redux/redux.js";
import handlerPopup from "../functions/handlerPopup.js";

const categories = require("../info/caseCategories.json");

class CaseProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toPortfolio = this.toPortfolio.bind(this);
    this.handlerGalery = this.handlerGalery.bind(this);

    this.parent = React.createRef();
  }

  toPortfolio() {
    const { card } = this.props;

    dispatcher({ type: "scrollToCase", data: card.id });
  }

  handlerGalery() {
    const { card } = this.props;

    handlerPopup("show", "galery", {
      images: [{ src: `${card.image}`, isGlobal: true }],
    });
  }

  componentDidMount() {
    this.handlerAnimateText = new HandlerAnimate({
      type: "text",
      classParent: ".textAnimate",
      parent: this.parent.current,
    });

    this.handlerAnimateText.init();
    this.handlerAnimateText.handler();
  }

  render() {
    const { card } = this.props;
    const rgb = hexToRgb(card.color);

    return (
      <div ref={this.parent} className="caseProject">
        <div
          className="caseProject__inner"
          style={{ background: `rgba(${rgb.r},${rgb.g},${rgb.b},.3)` }}
        >
          <div className="caseProject__content">
            <div className="textAnimate caseProject__category">
              {categories[card.category].content}
            </div>
            <h3 className="textAnimate caseProject__title">{card.name}</h3>
            {card.description && (
              <div
                className="textAnimate caseProject__description"
                dangerouslySetInnerHTML={{
                  __html: card.description.replace(/\n/g, "<br/>"),
                }}
              />
            )}

            <p className="textAnimate caseProject__price">
              от <span>{getFormatedPrice(card.price) || 0}</span> руб.
            </p>
            {card.labels && (
              <div className="caseProject__tags">
                {card.labels.map((tag, keyTag) => (
                  <div className="textAnimate caseProject__tag" key={keyTag}>
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
            <div className="textAnimate caseProject__link">
              <LinkArrow
                href="/portfolio"
                content="Подробнее"
                callback={this.toPortfolio}
              />
            </div>
          </div>
        </div>
        <img
          src={
            card.type !== "api"
              ? require(`../img/cases/${card.image}`).default.src
              : card.image
          }
          alt={card.image_title}
          className="caseProject__image"
          onClick={this.handlerGalery}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    device: state.device,
  };
}

export default connect(mapStateToProps)(CaseProject);
