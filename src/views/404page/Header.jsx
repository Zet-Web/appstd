import React, { Component } from "react";

import setSpacesInText from "../../functions/setSpacesInText";

class Header extends Component {
  render() {
    return (
      <div className="header404">
        <div className="header404__inner">
          <div className="header404__items">
            <div className="header404__item _content">
              <div className="header404__title">
                <h1 className="title _largeSizeTablet">
                  <b>Oops..!</b>
                  <i className="title__icon _icon19">
                    <img
                      src={
                        require("../../img/emodzi/emodzi-19.png").default.src
                      }
                      alt=""
                      className="title__iconItem"
                    />
                  </i>
                </h1>
              </div>
              <p className="header404__text">Кажется что-то пошло не так!</p>
              <p
                className="header404__text _grey"
                dangerouslySetInnerHTML={{
                  __html: setSpacesInText(
                    "Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена, или был введен неверный url в адресной строке"
                  ),
                }}
              ></p>
              <div className="header404__button">
                <div className="button _main">Перейти на Главную</div>
              </div>
            </div>
            <div className="header404__item _preview">
              <img
                src={require(`../../img/404-image.png`).default.src}
                alt=""
                className="header404__image"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
