import React, { Component } from "react";
import { connect } from "react-redux";

import setSpacesInText from "../../functions/setSpacesInText";
import HandlerAnimate from "../../classes/HandlerAnimate";
import Button from "../Button";
import CustomeLink from "../CustomeLink";

class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.parent = React.createRef();
  }

  renderButton() {
    const { link } = this.props;
    const href = link ? `stages/?stage=${link}` : "stages"
    return (
      <CustomeLink href={href} classname="caseStages__more">
        <Button classes="_main" content="Подробнее об этапах" />
      </CustomeLink>
    );
  }

  renderDescription() {
    const { model } = this.props;
    return (
      <p
        className="caseStages__description"
        dangerouslySetInnerHTML={{
          __html: setSpacesInText(model.description),
        }}
      ></p>
    );
  }

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.handlerAnimateLine = new HandlerAnimate({
      type: "stagesLine",
      classParent: ".caseStages__graphicItemInner",
      parent: this.parent.current,
    });

    this.handlerAnimateLine.init();
    this.handlerAnimateLine.handler();
  }

  render() {
    const { device, model } = this.props;

    return (
      <div ref={this.parent} className="caseStages">
        <div className="caseStages__inner">
          <div className="caseStages__content">
            <div className="caseStages__title">
              <h2 className="title _tall _mediumSizeTablet">
                <span dangerouslySetInnerHTML={{ __html: model.title }}></span>
                <i className={`title__elem _icon title__icon _icon12`}>
                  <img
                    src={require(`../../img/emodzi/emodzi-12.png`).default.src}
                    alt=""
                    className="title__iconItem"
                  />
                </i>
              </h2>
            </div>
            <div className="caseStages__items">
              <div className="caseStages__item _info">
                <ol className="caseStages__list">
                  {model.items.map((item, key) => (
                    <li
                      className="caseStages__listItem"
                      key={key}
                      data-key={key}
                    >
                      {item.content}
                    </li>
                  ))}
                </ol>
                {device === "desktop" && this.renderButton()}
              </div>
              <div className="caseStages__item _graphic">
                <div className="caseStages__graphic">
                  <div className="caseStages__graphicContent">
                    {model.items.map((item, key) => (
                      <div className="caseStages__graphicItem" key={key}>
                        <div
                          className="caseStages__graphicItemInner _hide"
                          style={{
                            width: `${item.duration}%`,
                            left: `${item.start}%`,
                          }}
                        ></div>
                      </div>
                    ))}
                    <div className="caseStages__graphicDir">
                      <span className="caseStages__graphicDirSupport">
                        неделя
                      </span>
                    </div>
                    <div className="caseStages__graphicBack">
                      {model.weeks.map((week, key) => (
                        <div
                          className={`caseStages__graphicBackItem _step${week}`}
                          key={key}
                        >
                          {week}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {device === "desktop" && this.renderDescription()}
              </div>
            </div>

            {device === "mobile" && (
              <div className="caseStages__info">
                {this.renderDescription()}
                {this.renderButton()}
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

export default connect(mapStateToProps)(Stages);
