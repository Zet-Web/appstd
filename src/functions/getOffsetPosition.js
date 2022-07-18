export default function getOffsetPosition(element) {
  return [
    element.getBoundingClientRect().x + window.pageXOffset,
    element.getBoundingClientRect().y + window.pageYOffset,
  ];
}
