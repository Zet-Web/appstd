// eslint-disable-next-line
let scroll = 0;
// eslint-disable-next-line
let fixFlag = false;

if (process.browser) {
  document.addEventListener("scroll", () => {
    if (!fixFlag) {
      scroll = window.pageYOffset;
    }
  });
}

function windowFixRemove() {
  if (process.browser) {
    fixFlag = false;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      document.querySelector("body").style.position = `static`;
      document.querySelector("body").style.top = `unset`;

      document.querySelector("body").scrollTo(0, scroll);
      document.querySelector("html").scrollTo(0, scroll);
    } else {
      document.querySelector("body").style.overflow = `visible`;
      document.querySelector("body").style.height = `auto`;
    }
  }
}

function windowFix() {
  if (process.browser) {
    fixFlag = true;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      document.querySelector("body").style.top = `${-scroll}px`;
      document.querySelector("body").style.position = `fixed`;
    } else {
      document.querySelector("body").style.overflow = `hidden`;
      document.querySelector("body").style.height = `100vh`;
    }
  }
}

export { windowFix, windowFixRemove, fixFlag };
