import React, { Component } from "react";
import Router from "next/router";

import Icon from "./Icon.jsx";
import CustomeLink from "./CustomeLink.jsx";
import { dispatcher } from "../redux/redux.js";

class HeadPagenation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items } = this.props;

    return (
      <div className="headPagenation">
        <div className="headPagenation__inner">
          <div className="headPagenation__content">
            <span
              className="headPagenation__back"
              onClick={() => {
                Router.back();
                setTimeout(() => {
                  const { pathname: href } = window.location;

                  dispatcher({
                    type: "url",
                    data: href.slice(1).split("/")[0],
                  });
                }, 100);
              }}
            >
              <Icon name="arrow-back" />
            </span>

            {items &&
              items.map((item, key) => (
                <CustomeLink href={`/${item.key}`} key={key}>
                  <span
                    className={`headPagenation__link ${
                      item.isCurrent === true ? "_current" : ""
                    }`}
                  >
                    {item.content}
                    {item.isCurrent !== true && (
                      <i className="headPagenation__linkIcon">
                        <Icon name="arrow-pagenation-head" />
                      </i>
                    )}
                  </span>
                </CustomeLink>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default HeadPagenation;
