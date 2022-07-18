import { createStore } from "redux";

let $localStorage;
let url;

if (process.browser) {
  $localStorage = localStorage;
  url = window.location.pathname.slice(1).split("/")[0];
}

const reducer = (
  state = {
    url,
    device: null,
    stateResize: false,
    stateMenu: -1,
    acceptCookies:
      $localStorage && $localStorage.getItem("acceptCookies") !== null,
    successForm: {
      state: -1,
    },
    errorForm: {
      state: -1,
    },
    isUp: false,
    startPositionCursor: {
      isInit: false,
      x: null,
      y: null,
    },
    isMobile: false,
    scrollToCase: null,
    galery: {
      state: -1,
    },
    portfolioPopup: {
      state: -1,
    },
  },
  settings
) => {
  if (process.browser) {
    document.dispatchEvent(
      new CustomEvent("updateRedux", {
        detail: { settings, state, type: settings.type },
      })
    );
  }

  switch (settings.type) {
    default: {
      if (settings.resolve && typeof settings.resolve === "function") {
        settings.resolve(true);
      }
      let newData;

      if (
        Array.isArray(settings.data) ||
        typeof settings.data === "string" ||
        typeof settings.data === "number" ||
        typeof settings.data === "boolean"
      ) {
        newData = settings.data;
      } else {
        newData = { ...state[settings.type], ...settings.data };
      }
      return {
        ...state,
        ...{
          [settings.type]: newData,
        },
      };
    }
  }
};

const store = createStore(reducer);

function dispatcher(settings) {
  return new Promise((resolve) => {
    store.dispatch({ ...settings, ...{ resolve } });
  });
}

export { store, dispatcher };
