import React, { Component } from "react";

import CustomeLink from "./CustomeLink.jsx";

class MobileFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nav = [
    {
      key: "intelligence",
      content: "Искусственный Интеллект",
    },
    {
      key: "marketplace",
      content: "Маркетплейс",
    },
    {
      key: "onlineshop",
      content: "Онлайн-магазин",
    },
  ];

  render() {
    return (
      <>
        <div className="mobileFooter _elemMobile">
          <div className="mobileFooter__inner">
            <div className="mobileFooter__info">
              <p className="mobileFooter__infoTitle">Россия</p>
              <p className="mobileFooter__infoCopy">
                © ООО “АППсСтудио”, 2013 - ∞
              </p>
            </div>
          </div>
        </div>
        <div className="body__mobileFooter _elemMobile">
          <div className="mobileFooter _fix">
            <div className="mobileFooter__nav">
              {this.nav.map((item, key) => (
                <span
                  className={`mobileFooter__navItem _${item.key}`}
                  key={key}
                >
                  <CustomeLink href={`/${item.key}`}>
                    <span className="mobileFooter__navContent">
                      {item.content}
                    </span>
                  </CustomeLink>
                </span>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MobileFooter;
