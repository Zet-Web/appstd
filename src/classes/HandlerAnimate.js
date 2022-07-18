export default class HandlerAnimate {
  constructor({
    type,
    parent,
    classParent = ".title",
    classElem = ".title__elem",
  }) {
    this.type = type;
    this.parent = parent;

    this.classParent = classParent;
    this.classElem = classElem;

    this.handler = this.handler.bind(this);
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  offset = 50;

  handler() {
    switch (this.type) {
      case "title":
        this.parent.querySelectorAll(this.classParent).forEach((title, key) => {
          if (
            this.titles[key] === false &&
            title.getBoundingClientRect().y <
              document.documentElement.clientHeight - this.offset
          ) {
            this.titles[key] = true;

            title.querySelectorAll(this.classElem).forEach((el, key) => {
              setTimeout(() => {
                el.classList.add("_show");
              }, key * 15);
            });
          }
        });
        break;
      case "text":
        this.parent.querySelectorAll(this.classParent).forEach((text, key) => {
          if (
            this.texts[key] === false &&
            text.getBoundingClientRect().y <
              document.documentElement.clientHeight - this.offset
          ) {
            this.texts[key] = true;

            text.classList.add("_show");
          }
        });
        break;
      case "stagesLine":
        this.parent.querySelectorAll(this.classParent).forEach((lines, key) => {
          if (
            this.stagesLine[key] === false &&
            lines.getBoundingClientRect().y <
              document.documentElement.clientHeight - this.offset
          ) {
            this.stagesLine[key] = true;

            lines.classList.remove("_hide");
          }
        });
        break;
      case "statsItems":
        this.parent.querySelectorAll(this.classParent).forEach((items, key) => {
          if (
            this.statsItems[key] === false &&
            items.getBoundingClientRect().y <
              document.documentElement.clientHeight - this.offset
          ) {
            this.statsItems[key] = true;

            items.classList.add("_show");
          }
        });
        break;
      case "case":
        if (
          this.case === false &&
          this.parent.getBoundingClientRect().y <
            document.documentElement.clientHeight - this.offset
        ) {
          this.case = true;

          this.parent.classList.remove("_hide");

          setTimeout(() => {
            this.parent.classList.add("_notAnimate");
          }, 1000);
        }
        break;
      default:
        break;
    }
  }

  init() {
    document.addEventListener("scroll", this.handler);

    switch (this.type) {
      case "title":
        this.titles = [];
        this.parent.querySelectorAll(this.classParent).forEach(() => {
          this.titles.push(false);
        });
        break;
      case "text":
        this.texts = [];
        this.parent.querySelectorAll(this.classParent).forEach(() => {
          this.texts.push(false);
        });
        break;
      case "stagesLine":
        this.stagesLine = [];
        this.parent.querySelectorAll(this.classParent).forEach(() => {
          this.stagesLine.push(false);
        });
        break;
      case "statsItems":
        this.statsItems = [];
        this.parent.querySelectorAll(this.classParent).forEach(() => {
          this.statsItems.push(false);
        });
        break;
      case "case":
        this.case = false;
        break;
      default:
        break;
    }
  }

  destroy() {
    document.removeEventListener("scroll", this.handler);
  }
}
