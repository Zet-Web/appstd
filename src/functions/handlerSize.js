import { dispatcher, store } from "../redux/redux";

// eslint-disable-next-line
let fontHtml;

if (process.browser) {
  if (document.documentElement.clientWidth <= 760) {
    dispatcher({ type: "device", data: "mobile" });
  }
  if (document.documentElement.clientWidth > 760) {
    dispatcher({ type: "device", data: "desktop" });
  }
}

function resize() {
  if (process.browser) {
    window.widthValue = document.documentElement.clientWidth;

    if (window.widthPrevValue != window.widthValue) {
      dispatcher({ type: "stateResize", data: !store.getState().stateResize });
      transition();
    }

    if (window.widthPrevValue > 760 && window.widthValue <= 760) {
      dispatcher({ type: "device", data: "mobile" });
      transition();
    }
    if (window.widthPrevValue <= 760 && window.widthValue > 760) {
      dispatcher({ type: "device", data: "desktop" });
      transition();
    }

    window.widthPrevValue = window.widthValue;
  }
}

function transition() {
  if (process.browser) {
    const head = document.querySelector("head");
    const styleComponent = document.createElement("style");

    styleComponent.className = "STYLE";
    styleComponent.appendChild(
      document.createTextNode(`*{transition: none!important;}`)
    );
    head.appendChild(styleComponent);
    setTimeout(() => {
      styleComponent.parentNode.removeChild(styleComponent);
    }, 100);
  }
}
transition();

resize();

export { fontHtml, resize, transition };
