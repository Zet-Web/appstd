import { dispatcher, store } from "../redux/redux";
import { windowFix, windowFixRemove } from "./windowFix";

export default function handlerMenu(action) {
  const { stateMenu } = store.getState();

  switch (action) {
    case "show":
      windowFix();
      dispatcher({ type: "stateMenu", data: 0 });
      setTimeout(() => {
        dispatcher({ type: "stateMenu", data: 1 });
      }, 30);
      break;
    case "hide":
      windowFixRemove();
      dispatcher({ type: "stateMenu", data: 0 });
      setTimeout(() => {
        dispatcher({ type: "stateMenu", data: -1 });
      }, 320);
      break;
    default:
      if (stateMenu === 1) {
        handlerMenu("hide");
      } else {
        handlerMenu("show");
      }
      break;
  }
}
