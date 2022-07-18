import React, { Component } from "react";
import { connect } from "react-redux";
import smoothscroll from "smoothscroll-polyfill";
import Head from "next/head";
import axios from "axios";

import TopBar from "./TopBar.jsx";
import Menu from "./Menu.jsx";
import ButtonUp from "../components/ButtonUp.jsx";
import Cookies from "../components/Cookies.jsx";
import { dispatcher } from "../redux/redux.js";
import MobileFooter from "../components/MobileFooter.jsx";
import SuccessForm from "../components/popups/SuccessForm.jsx";
import ErrorForm from "../components/popups/ErrorForm.jsx";
import Galery from "../components/Galery.jsx";
import Popup from "../components/portfolio/Popup.jsx";

if (process.browser) {
  smoothscroll.polyfill();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowButtonUp: false,
      isHideCookies: false,
    };

    this.handlerButtonUp = this.handlerButtonUp.bind(this);
    this.handlerCursor = this.handlerCursor.bind(this);
    this.hideCookies = this.hideCookies.bind(this);
    this.checkDevice = this.checkDevice.bind(this);
  }

  pages = [
    "",
    undefined,
    "index",
    "marketplace",
    "onlineshop",
    "intelligence",
    "stages",
    "about",
    "portfolio",
    "contacts",
  ];

  handlerButtonUp() {
    const { isShowButtonUp } = this.state;

    if (process.browser) {
      if (
        window.pageYOffset > document.documentElement.clientHeight &&
        isShowButtonUp === false
      ) {
        this.setState((state) => {
          const newState = { ...state };

          newState.isShowButtonUp = true;

          return newState;
        });
      }
      if (
        window.pageYOffset < document.documentElement.clientHeight &&
        isShowButtonUp === true
      ) {
        this.setState((state) => {
          const newState = { ...state };

          newState.isShowButtonUp = false;

          return newState;
        });
      }
    }
  }

  hideCookies() {
    this.setState(
      (state) => {
        const newState = { ...state };

        newState.isHideCookies = true;

        return newState;
      },
      () => {
        setTimeout(() => {
          localStorage.setItem("acceptCookies", true);
          dispatcher({ type: "acceptCookies", data: true });
        }, 300);
      }
    );
  }

  handlerCursor(e) {
    const { startPositionCursor } = this.props;

    if (!startPositionCursor.isInit) {
      dispatcher({
        type: "startPositionCursor",
        data: { isInit: true, x: e.clientX, y: e.clientY },
      });
    }
  }

  checkDevice() {
    const { isMobile } = this.props;

    if (!isMobile) {
      dispatcher({ type: "isMobile", data: true });
    }
  }

  getPresentation() {
    axios.get(`https://api.appsstudio.ru/v1/about`).then((res) => {
      const { presentation } = res.data;

      dispatcher({ type: "presentation", data: presentation });
    });
  }

  componentDidMount() {
    if (process.browser) {
      document.addEventListener("scroll", this.handlerButtonUp);
      document.addEventListener("touchstart", this.checkDevice);
      document.addEventListener("mousemove", this.handlerCursor);

      window.onpopstate = () => {
        const href = window.location.pathname.slice(1);

        dispatcher({ type: "url", data: href.split("/")[0] });
      };

      this.getPresentation();

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-FHW5W140PQ");

      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(
        window,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym"
      );

      ym(86308373, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    }
  }

  componentWillUnmount() {
    if (process.browser) {
      document.removeEventListener("scroll", this.handlerButtonUp);
      document.removeEventListener("touchstart", this.checkDevice);
      document.removeEventListener("mousemove", this.handlerCursor);
    }
  }

  render() {
    const { isShowButtonUp, isHideCookies } = this.state;
    const {
      device,
      stateResize,
      stateMenu,
      acceptCookies,
      successForm,
      errorForm,
      isMobile,
      galery,
      portfolioPopup,
    } = this.props;
    let { url } = this.props;

    if (!url) {
      url = "index";
    }

    return (
      <div
        className={`body__inner${(url && ` _${url}`) || ""} ${
          isMobile ? "_mobile" : ""
        }`}
      >
        <Head>
          <link rel="icon" type="image/png" href="/static/favicon.png" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-FHW5W140PQ"
          ></script>
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/86308373"
                style={{ display: "none" }}
                alt=""
              />
            </div>
          </noscript>
        </Head>
        <div className="body__topBar">
          <TopBar />
        </div>

        {[0, 1].indexOf(stateMenu) !== -1 && (
          <div className={`body__menu ${stateMenu === 1 ? "_show" : ""}`}>
            <Menu />
          </div>
        )}

        {portfolioPopup.state > -1 && (
          <div
            className={`body__portfolioPopup ${
              portfolioPopup.state === 1 ? "_show" : ""
            }`}
          >
            <Popup />
          </div>
        )}

        <div
          className={`body__buttonUp ${isShowButtonUp === true ? "_show" : ""}`}
        >
          <ButtonUp />
        </div>

        {successForm && [0, 1].indexOf(successForm.state) !== -1 && (
          <div
            className={`body__popup ${successForm.state === 1 ? "_show" : ""}`}
          >
            <SuccessForm />
          </div>
        )}

        {errorForm && [0, 1].indexOf(errorForm.state) !== -1 && (
          <div
            className={`body__popup ${errorForm.state === 1 ? "_show" : ""}`}
          >
            <ErrorForm />
          </div>
        )}

        {galery.state > -1 && <Galery />}

        <div
          className="body__sections"
          key={`${device}${stateResize === true ? "1" : "0"}`}
        >
          {this.props.children}
          {this.pages.indexOf(url?.toLowerCase()) !== -1 && <MobileFooter />}
        </div>

        {acceptCookies !== true && (
          <div
            className={`body__cookies ${isHideCookies === true ? "_hide" : ""}`}
          >
            <Cookies hideCookies={this.hideCookies} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    device: state.device,
    stateResize: state.stateResize,
    stateMenu: state.stateMenu,
    acceptCookies: state.acceptCookies,
    successForm: state.successForm,
    errorForm: state.errorForm,
    url: state.url,
    startPositionCursor: state.startPositionCursor,
    isMobile: state.isMobile,
    galery: state.galery,
    portfolioPopup: state.portfolioPopup,
  };
}

export default connect(mapStateToProps)(App);
