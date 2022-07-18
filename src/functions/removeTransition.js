export default function removeTransition(item, duration = 0, current = false) {
  const head = document.querySelector("head");
  const styleComponent = document.createElement("style");

  if (current) {
    styleComponent.appendChild(
      document.createTextNode(
        `${item}{transition: ${
          duration === 0 ? `none` : `${duration}s ease-in-out`
        }!important;};`
      )
    );
  } else {
    styleComponent.appendChild(
      document.createTextNode(
        `${item},${item}::before,${item}::after,${item} *,${item} *::before,${item} *::after{transition: ${
          duration === 0 ? `none` : `${duration}s ease-in-out`
        }!important;};`
      )
    );
  }
  head.appendChild(styleComponent);
  setTimeout(() => {
    styleComponent.parentNode.removeChild(styleComponent);
  }, 10);
}
