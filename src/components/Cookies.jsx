import React, { Component } from "react";

import setSpacesInText from "../functions/setSpacesInText";
import Button from "./Button";

class Cookies extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { hideCookies } = this.props;

    return (
      <div className="cookies">
        <div className="cookies__inner">
          <p
            className="cookies__text"
            dangerouslySetInnerHTML={{
              __html: setSpacesInText(
                "На пользу ИИ собираем&nbsp;ваши куки, без этого уже никак"
              ),
            }}
          ></p>
          <img
            src={require("../img/cookies-icon.png").default.src}
            alt=""
            className="cookies__icon"
          />
          <div
            className="cookies__button"
            onClick={() => {
              hideCookies();
            }}
          >
            <Button classes="_mainLight" content="Ясно" />
          </div>
        </div>
      </div>
    );
  }
}

export default Cookies;
