import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import setSpacesInText from "../../functions/setSpacesInText";
import Icon from "../Icon.jsx";
import handlerPopup from "../../functions/handlerPopup";
import Button from "../Button";

class SuccessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlerMissClick = this.handlerMissClick.bind(this);

    this.parent = React.createRef();
  }

  contents = {
    interactive: {
      title: "Заказ оформлен!",
      description:
        "Как только освободиться ближайший менеджер, он свяжется с Вами в указное время! Иногда, это может занимать до нескольких дней",
    },
    contacts: {
      title: "Заявка отправлена!",
      description:
        "Как только освободиться ближайший менеджер, он сразу с Вами свяжется",
    },
  };

  handlerMissClick(e) {
    const inner = this.parent.current.querySelector(".popup__inner");

    if (e.target !== inner && !inner.contains(e.target)) {
      handlerPopup("hide", "successForm");
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handlerMissClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handlerMissClick);
  }

  render() {
    const { successForm, presentation } = this.props;
    const { name } = successForm;

    const content = this.contents[name] || this.contents.contacts;

    return (
      <div ref={this.parent} className="popup _successForm">
        <div className="popup__inner">
          <div
            className="popup__close"
            onClick={() => {
              handlerPopup("hide", "successForm");
            }}
          >
            <i className="popup__closeIcon">
              <Icon name="close" />
            </i>
          </div>
          <img
            src={require("../../img/icon-success-form.png").default.src}
            alt=""
            className="popup__icon"
          />
          <h3 className="popup__title">{content.title}</h3>
          <p
            className="popup__description"
            dangerouslySetInnerHTML={{
              __html: setSpacesInText(content.description),
            }}
          ></p>
          <a
            className="popup__button _auto"
            href={presentation}
            target="_blank"
          >
            <Button classes="_main" content="Посмотреть презентацию" />
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    successForm: state.successForm,
    presentation: state.presentation,
  };
}

export default connect(mapStateToProps)(SuccessForm);

SuccessForm.propTypes = {
  icon: PropTypes.string,
  presentation: PropTypes.string,
};
