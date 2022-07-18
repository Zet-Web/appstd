import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import HeadPagenation from "../../components/HeadPagenation.jsx";
import CaseFull from "../../components/CaseFull.jsx";
import setSpacesInText from "../../functions/setSpacesInText.js";
import HandlerAnimate from "../../classes/HandlerAnimate.js";
import { dispatcher } from "../../redux/redux.js";
import getOffsetPosition from "../../functions/getOffsetPosition.js";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: null,
      getAllPages: false,
      currentPage: 1,
    };

    this.scrollToCase = this.scrollToCase.bind(this);
    this.handlerScroll = this.handlerScroll.bind(this);

    this.parent = React.createRef();
  }

  pagenation = [
    {
      key: "",
      content: "Главная",
    },
    {
      key: "portfolio",
      content: "Портфолио",
      isCurrent: true,
    },
  ];

  tabs = [
    {
      key: "marketplace",
      content: "Маркетплейсы",
    },
    {
      key: "online_store",
      content: "Онлайн-магазины",
    },
    {
      key: "ai",
      content: "Искусственный Интеллект",
    },
  ];

  getCases(key, isNewPage = false) {
    const { currentPage } = this.state;

    return new Promise((resolve) => {
      const query = key ? `category=${key}` : ``;

      axios
        .get(
          `https://api.appsstudio.ru/v1/portfolio/?${query}&page=${currentPage}`
        )
        .then(
          (res) => {
            const { items: cases } = res.data;

            this.setState(
              (state) => {
                const newState = { ...state };

                if (isNewPage) {
                  newState.cases = [...newState.cases, ...cases];
                } else {
                  newState.cases = cases;
                }

                return newState;
              },
              () => {
                this.scrollToCase();
                this.isProccessGetCases = false;

                resolve();
              }
            );
          },
          (error) => {
            const { code } = error?.response?.data;

            if (code === 404) {
              this.setState({ getAllPages: true });
            }

            this.isProccessGetCases = false;
          }
        );
    });
  }

  scrollToCase() {
    const { scrollToCase } = this.props;
    const caseItem = this.parent.current.querySelector(
      `.portfolioHeader__item[data-id="${scrollToCase}"]`
    );

    if (scrollToCase !== null) {
      if (caseItem) {
        const offset =
          (document.documentElement.clientHeight - caseItem.clientHeight) / 2;
        let top = getOffsetPosition(caseItem)[1] - offset - 50;

        if (top > getOffsetPosition(caseItem)[1]) {
          top = getOffsetPosition(caseItem)[1] - 100;
        }

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }

      dispatcher({ type: "scrollToCase", data: null });
    }
  }

  handlerTab(key) {
    const currentKey = this.state.currentKey === key ? null : key;

    const resetPagenation = () =>
      new Promise((resolve) => {
        this.setState(
          (state) => {
            const newState = { ...state };

            newState.currentPage = 1;
            newState.getAllPages = false;

            return newState;
          },
          () => resolve()
        );
      });

    resetPagenation().then(() => {
      this.getCases(currentKey).then(() => {
        this.setState((state) => {
          const newState = { ...state };

          newState.currentKey = currentKey;

          return newState;
        });
      });
    });
  }

  isProccessGetCases = false;

  handlerScroll() {
    const { cases, getAllPages, currentKey } = this.state;
    const { pageYOffset: scroll } = window;
    const topOfSection =
      getOffsetPosition(this.parent.current)[1] +
      this.parent.current.clientHeight -
      document.documentElement.clientHeight;

    if (
      !this.isProccessGetCases &&
      cases &&
      !getAllPages &&
      scroll > topOfSection
    ) {
      this.isProccessGetCases = true;

      this.setState(
        (state) => {
          const newState = { ...state };

          newState.currentPage += 1;

          return newState;
        },
        () => this.getCases(currentKey, true)
      );
    }
  }

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.getCases();

    document.addEventListener("scroll", this.handlerScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handlerScroll);
  }

  render() {
    const { currentKey, cases } = this.state;

    return (
      <div ref={this.parent} className="portfolioHeader">
        <div className="portfolioHeader__pagenation">
          <HeadPagenation items={this.pagenation} />
        </div>
        <div className="portfolioHeader__inner">
          <div className="portfolioHeader__head">
            <div className="portfolioHeader__title">
              <h1 className="title _mediumSizeTablet">
                <span className="title__elem">
                  <b>Портфолио</b>
                </span>
                <i className="title__elem _icon title__icon _icon18">
                  <img
                    src={require("../../img/emodzi/emodzi-18.png").default.src}
                    alt=""
                    className="title__iconItem"
                  />
                </i>
              </h1>
            </div>
            <p className="portfolioHeader__description _hard">
              Выполнили более 60 проектов за 9 лет.
            </p>
            <p
              className="portfolioHeader__description"
              dangerouslySetInnerHTML={{
                __html: setSpacesInText(
                  "Маркетплейсы, онлайн-магазины и проекты с Искусственным Интелектом - наш основной профиль, делаем их реально круто"
                ),
              }}
            ></p>
          </div>
          <div className="portfolioHeader__tabsContent">
            <div className="portfolioHeader__tabsBox">
              <div className="portfolioHeader__tabs">
                {this.tabs.map((tab, key) => (
                  <label
                    className={`portfolioHeader__tab _${tab.key}`}
                    key={key}
                  >
                    <input
                      type="checkbox"
                      className="portfolioHeader__tabInput"
                      onChange={() => this.handlerTab(tab.key)}
                      checked={currentKey === tab.key}
                    />
                    <div className="portfolioHeader__tabView">
                      {tab.content}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="portfolioHeader__items">
            {cases &&
              cases.map((card, key) => (
                <div
                  className="portfolioHeader__item"
                  data-id={card.id}
                  key={`${currentKey}${key}`}
                >
                  <CaseFull model={card} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    scrollToCase: state.scrollToCase,
  };
}

export default connect(mapStateToProps)(Portfolio);
