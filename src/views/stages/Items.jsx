import React, { Component } from "react";
// Add router from next js
import { withRouter } from 'next/router'

import setSpacesInText from "../../functions/setSpacesInText";
import getOffsetPosition from "../../functions/getOffsetPosition";
import HandlerAnimate from "../../classes/HandlerAnimate";
import getElemsFromString from "../../functions/getElemsFromString";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: null,
    };

    this.handlerScrollTo = this.handlerScrollTo.bind(this);
    this.handlerScroll = this.handlerScroll.bind(this);
    this.setCurrent = this.setCurrent.bind(this);

    this.parent = React.createRef();
  }

  handlerScrollTo(key) {
    const block = this.parent.current.querySelector(
      `.stagesItems__block[data-key="${key}"]`
    );
    const top =
      getOffsetPosition(block)[1] -
      document.querySelector(".topBar").offsetHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  setCurrent(key) {
    this.setState((state) => {
      const newState = { ...state };

      newState.currentKey = key;

      return newState;
    });
  }

  handlerScroll() {
    const { stages } = this.props;
    let findBlock = false;

    if (stages) {
      stages.forEach((block, key) => {
        const elem = this.parent.current.querySelector(
          `.stagesItems__block[data-key="${key}"]`
        );
        const top = elem.getBoundingClientRect().y;

        if (
          findBlock === false &&
          top < elem.offsetHeight / 2 + 100 &&
          top > -elem.offsetHeight / 2
        ) {
          this.setCurrent(key);

          findBlock = true;
        }
      });
    }
  }

  componentDidMount() {
    const stage = this.props.router.query.stage;
    if (stage) {
    this.handlerScrollTo(stage-1)
    }
    this.setCurrent(0);
    document.addEventListener("scroll", this.handlerScroll);

    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      classParent: ".stagesItems__blockTitle",
      classElem: ".stagesItems__blockTitleElem",
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
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handlerScroll);
  }

  render() {
    const { currentKey } = this.state;
    const { handlerInfo, stages } = this.props;

    return (
      <div ref={this.parent} className="stagesItems">
        <div className="stagesItems__inner">
          <div className="stagesItems__items">
            <div className="stagesItems__item _nav">
              <ul className="stagesItems__list">
                {stages &&
                  stages.map((block, key) => (
                    <li
                      className={`stagesItems__listItem ${
                        currentKey === key ? "_current" : ""
                      }`}
                      key={key}
                      onClick={() => this.handlerScrollTo(key)}
                    >
                      {block.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="stagesItems__item _content">
              {stages &&
                stages.map((block, key) => (
                  <div className="stagesItems__block" key={key} data-key={key}>
                    <div className="stagesItems__blockNumber">{key + 1}</div>
                    <div className="stagesItems__blockContent">
                      <h2 className="stagesItems__blockTitle">
                        <span>
                          {block.name.split(" ").map((el, key) => (
                            <span
                              className="stagesItems__blockTitleElem"
                              key={key}
                            >
                              {el}
                              &nbsp;
                            </span>
                          ))}
                        </span>
                      </h2>
                      <div className="stagesItems__blockTexts">
                        {block.description &&
                          getElemsFromString(block.description).map(
                            (text, keyT) => (
                              <p
                                className="textAnimate stagesItems__blockText"
                                key={keyT}
                                dangerouslySetInnerHTML={{
                                  __html: setSpacesInText(text),
                                }}
                              ></p>
                            )
                          )}
                      </div>
                      {block.support && (
                        <p
                          className="textAnimate stagesItems__blockSupport"
                          dangerouslySetInnerHTML={{
                            __html: setSpacesInText(block.support),
                          }}
                        ></p>
                      )}
                      <div className="stagesItems__blockFoot">
                        <h3 className="textAnimate stagesItems__blockFootTitle">
                          Что может включать данный этап:
                        </h3>
                        <ul className="textAnimate stagesItems__blockFootList">
                          {block.include.map((item, keyL) => (
                            <li
                              className="stagesItems__blockFootListItem"
                              key={keyL}
                              onClick={() => {
                                handlerInfo("show", {
                                  title: item.value,
                                  content: item.description,
                                  url: item.url,
                                });
                              }}
                            >
                              <span>{item.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Items);
