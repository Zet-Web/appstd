import { dispatcher, store } from "../redux/redux";
import { windowFix, windowFixRemove } from "./windowFix";

export default function handlerPopup(action, name, data = {}) {
  const statePopup = store.getState()[name];

  switch (action) {
    case "show":
      windowFix();
      dispatcher({ type: name, data: { state: 0, ...data } });
      setTimeout(() => {
        dispatcher({ type: name, data: { state: 1, ...data } });
      }, 30);
      break;
    case "hide":
      windowFixRemove();
      dispatcher({ type: name, data: { state: 0, name: null } });
      setTimeout(() => {
        dispatcher({ type: name, data: { state: -1 } });
      }, 320);
      break;
    default:
      if (statePopup === 1) {
        handlerPopup("hide");
      } else {
        handlerPopup("show");
      }
      break;
  }
}
