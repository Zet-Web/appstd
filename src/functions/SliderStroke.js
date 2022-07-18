export default class SliderStroke {
  constructor({ items, classItem }) {
    this.items = items;
    this.classItem = classItem;

    this.move = 0;

    this.init = this.init.bind(this);
  }

  intervalId = null;

  init() {
    this.widthItem = this.items.querySelector(this.classItem).clientWidth;
    this.elems = this.items.querySelectorAll(this.classItem);
    this.offset =
      (this.items.clientWidth - this.elems.length * this.widthItem) /
      this.elems.length;

    // parentNode.removeChild(styleComponent)

    this.intervalId = setInterval(() => {
      this.items.style.transform = `translate3d(${-this.move}px,0,0)`;
      this.move += 0.3;
      this.items.style.transform = `translate3d(${-this.move}px,0,0)`;
      this.move += 0.3;
      this.items.style.transform = `translate3d(${-this.move}px,0,0)`;
      this.move += 0.3;

      if (this.move >= this.widthItem + this.offset) {
        this.move -= this.widthItem + this.offset;
        this.items.style.transform = `translate3d(${-this.move}px,0,0)`;
        // console.log(this.elems[0]);
        this.items.removeChild(this.elems[0]);
        this.items.appendChild(this.elems[0]);
        this.elems = this.items.querySelectorAll(this.classItem);
      }
    }, 10);
  }
}
