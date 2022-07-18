export default function scrollTo(element, duration) {
  var e = document.documentElement;
  if (e.scrollTop === 0) {
    var t = e.scrollTop;
    ++e.scrollTop;
    e = t + 1 === e.scrollTop-- ? e : document.body;
  }
  scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
  if (duration <= 0) return;
  if (typeof from === "object") from = from.offsetTop;
  if (typeof to === "object") to = to.offsetTop;
  // Choose one effect like easeInQuart
  scrollToX(element, from, to, 0, 1 / duration, 20, easeInOutCuaic);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollTop = xTo;
    return;
  }
  element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
  t01 += speed * step;

  setTimeout(function () {
    scrollToX(element, xFrom, xTo, t01, speed, step, motion);
  }, step);
}

/* Effects List */
function linearTween(t) {
  return t;
}

function easeInQuad(t) {
  return t * t;
}

function easeOutQuad(t) {
  return -t * (t - 2);
}

function easeInOutQuad(t) {
  t /= 0.5;
  if (t < 1) return (t * t) / 2;
  t--;
  return (t * (t - 2) - 1) / 2;
}

function easeInCuaic(t) {
  return t * t * t;
}

function easeOutCuaic(t) {
  t--;
  return t * t * t + 1;
}

function easeInOutCuaic(t) {
  t /= 0.5;
  if (t < 1) return (t * t * t) / 2;
  t -= 2;
  return (t * t * t + 2) / 2;
}

function easeInQuart(t) {
  return t * t * t * t;
}

function easeOutQuart(t) {
  t--;
  return -(t * t * t * t - 1);
}

function easeInOutQuart(t) {
  t /= 0.5;
  if (t < 1) return 0.5 * t * t * t * t;
  t -= 2;
  return -(t * t * t * t - 2) / 2;
}

function easeInQuint(t) {
  return t * t * t * t * t;
}

function easeOutQuint(t) {
  t--;
  return t * t * t * t * t + 1;
}

function easeInOutQuint(t) {
  t /= 0.5;
  if (t < 1) return (t * t * t * t * t) / 2;
  t -= 2;
  return (t * t * t * t * t + 2) / 2;
}

function easeInSine(t) {
  return -Math.cos(t / (Math.PI / 2)) + 1;
}

function easeOutSine(t) {
  return Math.sin(t / (Math.PI / 2));
}

function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function easeInExpo(t) {
  return Math.pow(2, 10 * (t - 1));
}

function easeOutExpo(t) {
  return -Math.pow(2, -10 * t) + 1;
}

function easeInOutExpo(t) {
  t /= 0.5;
  if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
  t--;
  return (-Math.pow(2, -10 * t) + 2) / 2;
}

function easeInCirc(t) {
  return -Math.sqrt(1 - t * t) - 1;
}

function easeOutCirc(t) {
  t--;
  return Math.sqrt(1 - t * t);
}

function easeInOutCirc(t) {
  t /= 0.5;
  if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
  t -= 2;
  return (Math.sqrt(1 - t * t) + 1) / 2;
}
