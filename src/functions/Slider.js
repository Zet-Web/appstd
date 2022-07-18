let windowWidth;

if (process.browser) {
  windowWidth = document.documentElement.clientWidth;
}

export default class Slider {
  constructor(settings) {
    this.id = settings.id;
    this.slider = settings.slider;
    this.lay = settings.lay;
    this.itemsStart = Object.assign([], settings.items);
    this.items = Object.assign([], settings.items);
    this.buttons = settings.buttons;
    this.length = this.items.length;
    this.type = settings.type;
    this.current = settings.current;
    this.pagenation = settings.pagenation;
    this.infinity = settings.infinity;
    this.showEachSlide = settings.showEachSlide;
    this.calcHeight = settings.calcHeight;
    this.calcBox = settings.calcBox;
    this.loop = settings.loop;
    this.includeData = settings.includeData;
    this.different = settings.different;
    this.itemsWidth = [];
    this.transition = windowWidth > 760 ? `.5s ease-in-out` : `.5s ease-out`;
    this.time = {
      value: 0,
      intervalId: null,
    };
    this.data = settings.data;
    if (
      (this.type == "mobile" && windowWidth < 760) ||
      (this.type == "desktop" && windowWidth > 760) ||
      !this.type
    ) {
      this.sliderInit();
    }

    this.moveAction = this.moveAction.bind(this);
    this.sliderInit = this.sliderInit.bind(this);
    this.addItems = this.addItems.bind(this);
    this.resetSlider = this.resetSlider.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.calcTimeStep = this.calcTimeStep.bind(this);
    this.setCurrentSlid = this.setCurrentSlid.bind(this);
    this.getHeightCurrentStep = this.getHeightCurrentStep.bind(this);
    this.setLoop = this.setLoop.bind(this);
    this.getWidthStep = this.getWidthStep.bind(this);
    this.setInclude = this.setInclude.bind(this);
    this.setNeedItem = this.setNeedItem.bind(this);

    this.windowWidth = windowWidth;

    window.addEventListener("resize", this.resetSlider);

    document.dispatchEvent(
      new CustomEvent("change-slider", {
        detail: {
          id: this.id,
          type: "change",
          current: this.current,
          data: this.data,
        },
      })
    );
  }

  calcTimeStep() {
    this.time.value = 0;
    this.time.intervalId = setInterval(() => {
      this.time.value += 10;
    }, 10);
  }

  touchStart(event) {
    if (this.slider != null) {
      this.flag = true;
      this.flagEnd = false;
      this.containFlag = false;
      this.lay.style.transition = `0s`;
      this.startX = event.changedTouches[0].pageX;
      this.startY = event.changedTouches[0].pageY;
      this.flagX = false;
      this.flagY = false;
      this.calcTimeStep();
      if (this.loopId) {
        clearInterval(this.loopId);
      }
    }
  }

  touchMove(event) {
    if (this.slider != null) {
      if (this.flag && !this.containFlag) {
        this.moveStep = event.changedTouches[0].pageX - this.startX;
        this.moveX = event.changedTouches[0].pageX - this.startX + this.move;
        this.moveY = event.changedTouches[0].pageY - this.startY;
        if (event.changedTouches[0].pageX - this.startX < 0) {
          this.dir = "prev";
        } else {
          this.dir = "next";
        }
        if (Math.abs(this.moveY) > 25 && !this.flagX) {
          this.flagY = true;
          this.flagX = false;
        }
        if (
          Math.abs(event.changedTouches[0].pageX - this.startX) > 3 &&
          !this.flagY
        ) {
          this.flagX = true;
          this.flagY = false;
          event.preventDefault();
          event.stopPropagation();
        }
        if (this.flagX) {
          let move = this.moveX + (this.dir === "prev" ? 6 : -6);
          if (this.infinity === false && move > 0) {
            move /= 4;
          }
          if (
            this.infinity === false &&
            move < -(this.widthItem * (this.length - this.includeWindow))
          ) {
            move =
              -(this.widthItem * (this.length - this.includeWindow)) +
              (move + this.widthItem * (this.length - this.includeWindow)) / 4;
          }
          this.moveLay(move);
        }
      }
    }
  }

  touchEnd() {
    let cur;
    this.items.forEach((item) => {
      if (item.getAttribute("data-current") == "true") {
        cur = +item.getAttribute("data-id");
      }
    });

    if (this.slider != null && this.flag) {
      clearInterval(this.time.intervalId);
      if (this.flagX) {
        let delta = Math.abs(this.moveStep),
          speed = this.time.value / delta;
        // console.log(speed);

        if (this.dir == "prev") {
          if (
            this.moveX + 35 < this.move &&
            this.flag &&
            ((this.infinity === false &&
              cur + this.includeWindow !== this.items.length) ||
              this.infinity === true)
          ) {
            this.moveAction("next", speed);
          } else {
            this.lay.style.transition = this.transition;

            this.moveLay(this.move);
            setTimeout(() => {
              this.lay.style.transition = `0s`;
              this.flagEnd = true;
            }, 510);
          }
        } else {
          if (
            this.moveX - 35 > this.move &&
            this.flag &&
            ((this.infinity === false && cur !== 0) || this.infinity === true)
          ) {
            this.moveAction("prev", speed);
          } else {
            this.lay.style.transition = this.transition;
            this.moveLay(this.move);
            setTimeout(() => {
              this.lay.style.transition = `0s`;
              this.flagEnd = true;
            }, 510);
          }
        }
      } else {
        this.flagEnd = true;
      }
      this.flag = false;
      this.startX = 0;
      this.moveX = 0;
      this.setLoop();
    }
  }

  getHeightCurrentStep(current) {
    let heightStep;
    this.itemsStart.forEach((item, key) => {
      if (current == key) {
        heightStep = item.clientHeight;
      }
    });
    return heightStep;
  }

  setLoop() {
    if (this.loop) {
      if (this.loopId) {
        clearInterval(this.loopId);
      }
      this.loopId = setInterval(() => {
        this.moveAction("next");
      }, this.loop);
    }
  }

  setNeedItem(currentKey, isHard = false) {
    let current;
    let key = currentKey;

    if (key > this.length - this.includeWindow && this.showEachSlide !== true) {
      key = this.length - this.includeWindow;
    }

    if (this.showEachSlide === true && key > this.length) {
      key = this.length;
    }

    if (key < 0) {
      key = 0;
    }

    this.items.forEach((item, keyItem) => {
      if (item.getAttribute("data-current")) {
        current = +item.getAttribute("data-id");
      }

      if (this.pagenation) {
        this.slider
          .querySelector(`.${this.pagenation.dot}[data-id="${keyItem}"]`)
          .classList.remove("_current");
      }
    });

    this.move = -this.getWidthStep() * key;
    if (!isHard) {
      this.lay.style.transition = this.transition;
    }

    setTimeout(() => {
      this.moveLay(this.move);
    }, 10);

    setTimeout(() => {
      this.lay.style.transition = `0s`;
    }, 500);

    this.items.forEach((item) => {
      if (+item.getAttribute("data-id") === key) {
        item.setAttribute("data-current", "true");
        if (this.pagenation) {
          this.slider
            .querySelector(`.${this.pagenation.dot}[data-id="${key}"]`)
            .classList.add("_current");
        }
      } else {
        item.removeAttribute("data-current");
      }
    });

    if (this.buttons) {
      if (key > current) {
        if (this.buttons.prev) {
          this.buttons.prev.removeAttribute("data-disable");
        }
        if (key + this.includeWindow === this.length) {
          this.buttons.next.setAttribute("data-disable", true);
        }
      }
      if (key < current) {
        if (this.buttons.next) {
          this.buttons.next.removeAttribute("data-disable");
        }
        if (key === 0) {
          this.buttons.prev.setAttribute("data-disable", true);
        }
      }
    }

    document.dispatchEvent(
      new CustomEvent("change-slider", {
        detail: {
          id: this.id,
          type: "change",
          current: key,
          data: this.data,
        },
      })
    );
  }

  sliderInit() {
    this.lay.style.position = "relative";
    this.lay.style.userSelect = "none";
    this.widthLay = this.lay.offsetWidth;
    this.widthItem = this.widthLay / this.length;
    let realyWidthItem;

    this.itemsStart.forEach((item) => {
      if (!realyWidthItem) {
        realyWidthItem = item.clientWidth;
      }
    });

    // const marginWidthItem =
    //     (this.widthLay - realyWidthItem * this.length) / this.length;

    this.includeWindow = Math.floor(this.slider.offsetWidth / realyWidthItem);

    if (
      (this.includeWindow >= this.length && this.showEachSlide !== true) ||
      this.itemsStart.length <= 1
    ) {
      this.itemsStart[0].setAttribute("data-current", "true");

      if (this.buttons && this.buttons.parent) {
        this.buttons.parent.style.display = "none";
      }

      return false;
    }

    if (this.showEachSlide === true) {
      this.includeWindow = 1;
    }

    if (this.includeData) {
      this.includeWindow = this.includeData;
    }

    this.move = 0;
    this.flag = false;
    this.flagEnd = true;
    this.containFlag = false;
    if (this.loop) {
      this.setLoop();
    }
    if (this.pagenation) {
      if (this.pagenation.current) {
        this.pagenation.current.innerHTML = this.current + 1;
      }
      if (this.pagenation.all) {
        this.pagenation.all.innerHTML = this.length;
      }
      if (this.pagenation.parent) {
        this.pagenation.parent.innerHTML = "";
      }
    }

    if (this.calcHeight === true) {
      this.calcBox.style.overflow = "hidden";
      this.calcBox.style.height = `${this.getHeightCurrentStep(
        this.current
      )}px`;
    }

    let pag = {
      width: 0,
      height: 0,
    };

    this.itemsStart.forEach((item, key) => {
      item.setAttribute("data-id", key);
      item.removeAttribute("data-current");
      if (this.current == key) {
        item.setAttribute("data-current", true);
      }
      if (this.pagenation && this.pagenation.dot) {
        let dot = document.createElement("div");
        dot.classList.add(this.pagenation.dot);
        dot.setAttribute("data-id", key);
        if (this.current == key) {
          dot.classList.add("_current");
        }
        this.pagenation.parent.appendChild(dot);
        if (this.pagenation.circle === true) {
          dot.removeAttribute("style");
          (pag.width = pag.width === 0 ? dot.clientWidth : pag.width),
            (pag.height = pag.height === 0 ? dot.clientWidth : pag.height);
          dot.style.width = `${pag.width}px`;
          dot.style.height = `${pag.height}px`;
        }

        if (this.infinity !== true) {
          dot.onclick = () => {
            this.setNeedItem(key);
          };
        }
      }
      if (this.different === true) {
        this.itemsWidth.push(item.offsetWidth);
      }
    });

    this.setInclude(this.current);
    if (this.different === true) {
      let itemsWidthSum = this.itemsWidth.reduce(function (a, b) {
        return a + b;
      });
      this.offset = (this.lay.offsetWidth - itemsWidthSum) / this.length;
    }

    this.left = this.lay.getBoundingClientRect().x;
    this.right =
      windowWidth - (this.lay.getBoundingClientRect().x + this.lay.offsetWidth);
    if (this.right < 0) {
      this.right = 0;
    }
    if (this.left < 0) {
      this.left = 0;
    }
    if (this.infinity !== false) {
      this.addItems(
        "next",
        Math.ceil(this.right / this.widthItem) +
          Math.ceil(windowWidth / this.widthItem)
      );
      this.addItems(
        "prev",
        Math.ceil(this.left / this.widthItem) +
          Math.ceil(windowWidth / this.widthItem)
      );
    }

    this.startX = 0;
    this.moveX = 0;
    this.startY = 0;
    this.moveY = 0;

    if (this.buttons) {
      ["prev", "next"].forEach((key) => {
        const button = this.buttons[key];

        if (button) {
          button.onclick = () => {
            const disable = button.getAttribute("data-disable");

            if (this.flagEnd && !disable) {
              if (this.loop) {
                this.setLoop();
              }
              this.moveAction(key);
            }
          };
        }
      });

      if (this.infinity === false && this.current === 0 && this.buttons.prev) {
        this.buttons.prev.setAttribute("data-disable", true);
      }
    }

    // if (process.browser) {
    //     document.addEventListener("stateResize", (e) => {
    //         this.resetSlider(true);
    //     });
    // }

    this.setNeedItem(this.current, true);

    this.lay.addEventListener("touchstart", this.touchStart.bind(this));
    this.slider.addEventListener("touchmove", this.touchMove.bind(this), {
      passive: false,
    });
    this.slider.addEventListener("touchend", this.touchEnd.bind(this));
  }

  addItems(direction, count) {
    let iteration, newItem;
    switch (direction) {
      case "next":
        iteration = 0;
        for (let i = 0; i < count; i++) {
          if (iteration == this.length) {
            iteration = 0;
          }
          this.items.forEach((item) => {
            if (+item.getAttribute("data-id") == iteration) {
              newItem = item.cloneNode(true);
            }
          });
          newItem.removeAttribute("data-current");
          iteration++;
          this.lay.append(newItem);
          this.items.push(newItem);
        }
        break;
      case "prev":
        let left = 0;
        iteration = this.length - 1;
        for (let i = count; i > 0; i--) {
          if (iteration == -1) {
            iteration = this.length - 1;
          }
          left -= this.widthItem;
          this.items.forEach((item) => {
            if (+item.getAttribute("data-id") == iteration) {
              newItem = item.cloneNode(true);
            }
          });
          newItem.removeAttribute("data-current");
          iteration--;
          this.lay.prepend(newItem);
          this.items.unshift(newItem);
          this.lay.style.left = `${left}px`;
          this.left = left;
        }
        break;
    }
  }

  resetSlider(isHard = false) {
    if (this.windowWidth !== windowWidth || isHard === true) {
      this.windowWidth = windowWidth;
      this.lay.innerHTML = "";
      this.slider.removeAttribute("style");
      this.lay.removeAttribute("style");
      this.itemsStart.forEach((item, key) => {
        item.removeAttribute("data-id");
        item.removeAttribute("data-current");
        item.removeAttribute("data-include");
        this.lay.append(item);
      });
      this.items = Object.assign([], this.itemsStart);
      if (
        (this.type == "mobile" && windowWidth < 760) ||
        (this.type == "desktop" && windowWidth > 760) ||
        !this.type ||
        isHard === true
      ) {
        this.sliderInit();
      }
    }
  }

  moveLay(value, current, direction) {
    this.lay.style.transform = `translate3d(${value}px,0,0)`;

    if (this.calcHeight === true) {
      this.calcBox.style.transition = `.5s ease-in-out`;
      this.calcBox.style.height = `${this.getHeightCurrentStep(
        direction === "next" ? current + 1 : current - 1
      )}px`;
    }
  }

  getWidthStep(current) {
    if (this.different === true) {
      return current !== null
        ? this.itemsWidth[current] + this.offset
        : this.widthItem;
    } else {
      return this.widthItem;
    }
  }

  moveAction(direction, speed) {
    let cloneItem, idCloneItem, currentItem, clone, removeChild, cur;
    this.flagEnd = false;
    this.items.forEach((item) => {
      if (item.getAttribute("data-current") == "true") {
        currentItem = item;
        cur = +item.getAttribute("data-id");
      }
    });

    // console.log(this.getWidthStep(cur))

    // console.log(cur + this.includeWindow, this.length)
    if (
      this.infinity === false &&
      ((cur === 0 && direction === "prev") ||
        (cur + this.includeWindow === this.length && direction === "next"))
    ) {
      this.flagEnd = true;
      if (windowWidth < 760) {
        this.lay.style.transition = this.transition;
        this.moveLay(this.move, cur, direction);
      }
      return false;
    }

    let setPag = () => {
      let current;
      this.items.forEach((item) => {
        if (item.getAttribute("data-current") == "true") {
          current = +item.getAttribute("data-id") + 1;
        }
        if (this.pagenation && this.pagenation.dot) {
          this.slider
            .querySelector(
              `.${this.pagenation.dot}[data-id="${item.getAttribute(
                "data-id"
              )}"]`
            )
            .classList.remove("_current");
        }
      });

      const currentForInclude = current - 1;

      this.setInclude(currentForInclude);
      document.dispatchEvent(
        new CustomEvent("change-slider", {
          detail: {
            id: this.id,
            type: "change",
            current: current - 1,
            data: this.data,
          },
        })
      );
      if (this.pagenation) {
        if (this.pagenation.current) {
          this.pagenation.current.innerHTML = current;
        }
        if (
          this.pagenation.dot &&
          this.slider.querySelector(
            `.${this.pagenation.dot}[data-id="${current - 1}"]`
          )
        ) {
          this.slider
            .querySelector(`.${this.pagenation.dot}[data-id="${current - 1}"]`)
            .classList.add("_current");
        }
      }
    };

    let getEl = (el) => {
      switch (direction) {
        case "next":
          return el.nextElementSibling;
        case "prev":
          return el.previousElementSibling;
      }
    };

    let moveWithSpeed = (k) => {
      this.move += k * this.getWidthStep(cur);
    };

    let setCurrent = () => {
      if (currentItem) {
        getEl(currentItem).setAttribute("data-current", true);
      }
    };

    switch (direction) {
      case "next":
        this.items.forEach((item) => {
          if (item == this.lay.lastElementChild) {
            cloneItem = item;
          }
          if (item == this.lay.firstElementChild) {
            removeChild = item;
          }
        });
        if (cloneItem) {
          idCloneItem = +cloneItem.getAttribute("data-id") + 1;
          if (idCloneItem == this.length) {
            idCloneItem = 0;
          }
        }
        if (currentItem) {
          currentItem.removeAttribute("data-current");
        }

        if (currentItem && !currentItem.nextElementSibling) {
          if (this.infinity === false) {
            currentItem.setAttribute("data-current", true);
            this.move += this.getWidthStep(cur);
          }
        }

        moveWithSpeed(-1);
        if (
          (currentItem &&
            currentItem.nextElementSibling &&
            +currentItem.nextElementSibling.getAttribute("data-id") +
              this.includeWindow >=
              this.length) ||
          (currentItem &&
            +currentItem.getAttribute("data-id") + this.includeWindow >=
              this.length)
        ) {
          if (this.infinity === false && windowWidth < 760) {
            this.move =
              -this.getWidthStep(cur) * (this.length - this.includeWindow);
          }
        }

        setCurrent();
        setPag();
        if (this.infinity === false) {
          if (this.buttons) {
            if (this.buttons.prev) {
              this.buttons.prev.removeAttribute("data-disable");
            }
            if (
              +currentItem.getAttribute("data-id") + this.includeWindow ===
              this.length - 1
            ) {
              this.buttons.next.setAttribute("data-disable", true);
            }
          }
        }
        if (this.infinity !== false) {
          setTimeout(() => {
            this.lay.style.transition = this.transition;
            this.moveLay(this.move, cur, direction);
          }, 10);
        }
        if (this.infinity === false) {
          // console.log(+currentItem.getAttribute('data-id') + 1 + this.includeWindow, this.length)
          if (
            +currentItem.getAttribute("data-id") + this.includeWindow >=
            this.length
          ) {
            this.flagEnd = true;

            return false;
          } else {
            setTimeout(() => {
              this.lay.style.transition = this.transition;
              this.moveLay(this.move, cur, direction);
            }, 10);
          }
        }
        setTimeout(() => {
          this.items.forEach((item) => {
            if (+item.getAttribute("data-id") == idCloneItem) {
              clone = item.cloneNode(true);
              clone.removeAttribute("data-current");
            }
          });

          if (this.infinity !== false) {
            this.lay.append(clone);
            this.items.push(clone);
            this.left += this.getWidthStep(cur);
            this.lay.style.left = `${this.left}px`;
          }

          if (
            removeChild &&
            this.infinity !== false &&
            removeChild.parentNode
          ) {
            removeChild.parentNode.removeChild(removeChild);
          }
          this.lay.style.transition = `0s`;
          this.flagEnd = true;
          document.dispatchEvent(
            new CustomEvent("create-slider-item", {
              detail: { id: this.id, type: "clone" },
            })
          );
        }, 510);
        break;
      case "prev":
        this.items.forEach((item) => {
          if (item == this.lay.firstElementChild) {
            cloneItem = item;
          }
          if (item == this.lay.lastElementChild) {
            removeChild = item;
          }
        });
        if (cloneItem) {
          idCloneItem = +cloneItem.getAttribute("data-id") - 1;
          if (idCloneItem == -1) {
            idCloneItem = this.length - 1;
          }
        }
        if (currentItem) {
          currentItem.removeAttribute("data-current");
        }

        setCurrent();
        if (this.infinity === false) {
          if (this.buttons) {
            if (this.buttons.next) {
              this.buttons.next.removeAttribute("data-disable");
            }
            if (+currentItem.getAttribute("data-id") === 1) {
              this.buttons.prev.setAttribute("data-disable", true);
            }
          }
        }
        if (currentItem.previousElementSibling) {
          // currentItem.previousElementSibling.setAttribute('data-current', true)
        } else {
          if (this.infinity === false) {
            currentItem.setAttribute("data-current", true);
            this.move -= this.getWidthStep(cur);
          }
        }

        setPag();
        moveWithSpeed(1);

        if (
          +currentItem.getAttribute("data-id") === 0 ||
          (currentItem.previousElementSibling &&
            +currentItem.previousElementSibling.getAttribute("data-id") === 0)
        ) {
          if (this.infinity === false) {
            this.move = 0;
          }
        }

        setTimeout(() => {
          this.lay.style.transition = this.transition;
          this.moveLay(this.move, cur, direction);
        }, 10);

        if (this.infinity === false) {
          if (+currentItem.getAttribute("data-id") === 0) {
            return false;
          }
        }

        setTimeout(() => {
          this.items.forEach((item) => {
            if (+item.getAttribute("data-id") == idCloneItem) {
              clone = item.cloneNode(true);
            }
          });

          if (this.infinity !== false) {
            this.lay.prepend(clone);
            this.items.unshift(clone);
            this.left -= this.getWidthStep(cur);
            this.lay.style.left = `${this.left}px`;
          }

          this.lay.style.transition = `0s`;
          if (removeChild && this.infinity !== false) {
            removeChild.parentNode.removeChild(removeChild);
          }
          this.flagEnd = true;
          document.dispatchEvent(
            new CustomEvent("create-slider-item", {
              detail: { id: this.id, type: "clone" },
            })
          );
        }, 510);
        break;
    }
  }

  setInclude(currentId) {
    if (this.infinity !== true) {
      this.items.forEach((item) => {
        const id = +item.getAttribute("data-id");
        item.removeAttribute("data-include");
        if (id >= currentId && id < currentId + this.includeWindow) {
          item.setAttribute("data-include", "");
        }
      });
    }
  }

  setCurrentSlid(id) {
    if (this.infinity === false) {
      this.move = -((+id - 1) * this.widthItem);
      this.items.forEach((item) => {
        if (+item.getAttribute("data-id") === +id - 1) {
          item.setAttribute("data-current", true);
        } else {
          item.removeAttribute("data-current");
        }
      });
      document.dispatchEvent(
        new CustomEvent("change-slider", {
          detail: {
            id: this.id,
            type: "change",
            current: +id - 1,
            data: this.data,
          },
        })
      );
      if (this.buttons) {
        if (this.buttons.prev) {
          this.buttons.prev.removeAttribute("data-disable");
          if (+id - 1 === 0) {
            this.buttons.prev.setAttribute("data-disable", true);
          }
        }
        if (this.buttons.next) {
          this.buttons.next.removeAttribute("data-disable");
          if (+id - 1 + this.includeWindow === this.length) {
            this.buttons.next.setAttribute("data-disable", true);
          }
        }
      }
      setTimeout(() => {
        this.lay.style.transition = this.transition;
        this.moveLay(this.move);
      }, 10);
    }
  }

  destroy() {
    window.removeEventListener("resize", this.resetSlider);
    this.lay.removeEventListener("touchstart", this.touchStart.bind(this));
    this.slider.removeEventListener("touchmove", this.touchMove.bind(this), {
      passive: false,
    });
    this.slider.removeEventListener("touchend", this.touchEnd.bind(this));
  }
}
