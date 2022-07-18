import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class InputMask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
    };

    this.handlerInput = this.handlerInput.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setValidate = this.setValidate.bind(this);
    this.getPositionsDel = this.getPositionsDel.bind(this);
    this.getCurrentRegs = this.getCurrentRegs.bind(this);
    this.handlerValue = this.handlerValue.bind(this);
    this.getLenSupport = this.getLenSupport.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.handlerEvents = this.handlerEvents.bind(this);

    this.input = React.createRef();
  }

  _focus = false;

  regs = {
    number: /[^0-9 ]/g,
  };

  typesOfRegs = [
    {
      items: ["phone"],
      key: "number",
    },
  ];

  getCurrentRegs() {
    const { settings } = this.props;
    const { validate } = settings;
    const current = this.typesOfRegs.find(
      (type) => type.items.indexOf(validate) !== -1
    ).key;

    return this.regs[current];
  }

  handlerValue(valRes) {
    const { settings } = this.props;
    const { validate, support } = settings;
    let val = valRes;

    if (support) {
      val = val.slice(support.content.length);
    }

    switch (validate) {
      case "vin":
        val = val.toUpperCase();
        break;
      default:
        break;
    }

    return val;
  }

  getLenSupport() {
    const { settings } = this.props;
    const { support } = settings;
    const lenSup = support ? support.content.length : 0;

    return lenSup;
  }

  getCursorPosition() {
    let caretPos = 0;
    const input = this.input.current;

    if (document.selection) {
      input.focus();
      const sel = document.selection.createRange();
      sel.moveStart("character", -input.value.length);
      caretPos = sel.text.length;
    } else if (input.selectionStart || input.selectionStart === "0") {
      caretPos = input.selectionStart;
    }
    return caretPos - this.getLenSupport() < 0
      ? 0
      : caretPos - this.getLenSupport();
  }

  // eslint-disable-next-line
  replaceSymbols(str, index, deleteCount, symb) {
    const newStr = str.split("");

    newStr.splice(index, deleteCount, symb);

    return newStr.join("");
  }

  setValue(valRes, start = 0, str, isDelete) {
    let val = valRes;
    return new Promise((resolve) => {
      const { callback, settings } = this.props;
      const { template, charDel, charEmpty, name, support } = settings;
      let breakLen = start + str.length;

      if (isDelete !== null) {
        breakLen = start - (val.length - isDelete.length);
        // eslint-disable-next-line
        for (let i = start - (val.length - isDelete.length); i < start; i++) {
          if (this.getPositionsDel().indexOf(i) !== -1) {
            val = this.replaceSymbols(val, i, 1, charDel);
          } else {
            val = this.replaceSymbols(val, i, 1, charEmpty);
          }
        }
      } else {
        // eslint-disable-next-line
        for (let i = start; i < breakLen; i++) {
          if (this.getPositionsDel().indexOf(i) !== -1) {
            breakLen += 1;
            // eslint-disable-next-line
            for (let j = breakLen - 1; j >= i + 1; j--) {
              val = this.replaceSymbols(val, j, 1, val[j - 1]);
            }
            val = this.replaceSymbols(val, i, 1, charDel);
          }
        }
      }

      val = this.setValidate(val.slice(0, template.length));
      if (support) {
        val = `${support.content}${val}`;
      }
      callback({ name, value: val, action: "change" }).then(() => {
        this.input.current.setSelectionRange(
          breakLen + this.getLenSupport(),
          breakLen + this.getLenSupport()
        );
        resolve(val);
      });
    });
  }

  getPositionsDel() {
    const { settings } = this.props;
    const { template, charDel } = settings;
    const arr = [];
    // eslint-disable-next-line
    for (let i = 0; i < template.length; i++) {
      if (template[i] === charDel) {
        arr.push(i);
      }
    }

    return arr;
  }

  handlerInput(action, val) {
    const { callback, settings } = this.props;
    let { value } = this.props;
    const { template, handlerComplete, name, support, showTemplate } = settings;

    if (support) {
      value = value.slice(support.content.length);
    }
    switch (action) {
      case "change":
        {
          const lenVal = val.length - template.length;
          const start = this.getCursorPosition() - lenVal;
          const valWithOutTemp = val
            .slice(start, start + lenVal)
            .replace(this.getCurrentRegs(), "");
          let valWas = ``;
          let isDelete = null;
          // eslint-disable-next-line
          for (let i = 0; i < template.length; i++) {
            if (i >= start && i < start + valWithOutTemp.length) {
              valWas += valWithOutTemp[i - start];
            } else {
              valWas += value[i];
            }
          }
          isDelete = valWas.length > val.length ? val : null;
          this.setValue(valWas, start, valWithOutTemp, isDelete).then(
            (valInner) => {
              if (this.checkComplete(valInner) === true) {
                if (handlerComplete && typeof handlerComplete === "function") {
                  handlerComplete({
                    name,
                    value: this.getNeedFormat(valInner),
                  });
                }
              }
            }
          );
        }
        break;
      case "focus":
        if (this._focus === false) {
          this._focus = true;
          this.input.current.focus();
          if (!value) {
            let valueInner;
            if (support) {
              valueInner = `${support.content}${template}`;
            } else {
              valueInner = template;
            }
            callback({ name, value: valueInner, action: "change" }).then(() => {
              this.input.current.setSelectionRange(
                this.getLenSupport(),
                this.getLenSupport()
              );
            });
          }

          this.setState((state) => {
            const newState = { ...state };

            newState.isFocus = true;

            return newState;
          });
        }
        break;
      case "blur":
        this._focus = false;
        if (
          showTemplate !== true &&
          (value === template || this.checkComplete(value) === false)
        ) {
          callback({ name, value: ``, action: "change", type: "blur" }).then(
            () => {
              if (handlerComplete && typeof handlerComplete === "function") {
                handlerComplete({ name, value: null });
              }
            }
          );
        }

        this.setState((state) => {
          const newState = { ...state };

          newState.isFocus = false;

          return newState;
        });
        break;
      default:
        break;
    }
  }

  checkComplete(val) {
    const { settings } = this.props;
    const { charEmpty } = settings;

    return val.indexOf(charEmpty) === -1;
  }

  setValidate(val) {
    const { settings } = this.props;
    const { validate, charDel } = settings;
    const items = val.split(charDel);

    switch (validate) {
      case "date":
        if (+items[0] > 31) {
          items[0] = 31;
        }
        if (+items[1] > 12) {
          items[1] = 12;
        }
        break;
      case "rate":
        if (+items[0] > 4) {
          items[0] = 5;
          items[1] = 0;
        }
        break;
      case "year":
        if (+items[0] > +new Date().getFullYear()) {
          items[0] = +new Date().getFullYear();
        }
        break;
      case "time":
        if (+items[0] > 23) {
          items[0] = 23;
        }
        if (+items[1] > 59) {
          items[1] = 59;
        }
        break;
      default:
        break;
    }
    return items.join(charDel);
  }

  getNeedFormat(val) {
    const { settings } = this.props;
    const { validate, charDel, support } = settings;
    const items = val
      .slice(support ? support.content.length : 0)
      .split(charDel);
    const dateReturn = new Date();

    switch (validate) {
      case "date":
        {
          const year = items[2].length === 2 ? `20${items[2]}` : items[2];
          dateReturn.setDate(+items[0]);
          dateReturn.setMonth(+items[1] - 1);
          dateReturn.setFullYear(year);
        }
        break;
      default:
        break;
    }
    return dateReturn.toString();
  }

  setFocus(e) {
    const { value } = this.props;

    if (this._focus === false && !value && e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.handlerInput("focus");
  }

  handlerEvents(e) {
    const { settings } = this.props;
    const { name, id } = settings;
    const { detail } = e;

    if (detail) {
      const { action } = detail;
      const nameComeEvent = detail.name;

      if (nameComeEvent === (id || name)) {
        switch (action) {
          case "focus":
            this.setFocus();
            break;
          default:
            break;
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener("focus-input", this.handlerEvents);
  }

  componentWillUnmount() {
    document.removeEventListener("focus-input", this.handlerEvents);
  }

  render() {
    const { isFocus } = this.state;
    const { value, settings } = this.props;
    const { showTemplate, error } = settings;

    return (
      <div
        className={`field ${isFocus === true || value ? "_active" : ""} ${
          isFocus === true ? "_focus" : ""
        } ${error ? "_error" : ""}`}
      >
        <label className="field__support" htmlFor={settings.name}>
          {settings.field.support}
          {settings.field.isRequired === true ? <span>*</span> : null}
        </label>
        {error && <div className="field__error">{error}</div>}
        <div className="field__box">
          <input
            id={settings.name}
            className="field__input"
            ref={this.input}
            type="text"
            value={
              (showTemplate === true &&
                isFocus === false &&
                !value &&
                settings.template) ||
              value
            }
            onChange={(e) =>
              this.handlerInput("change", this.handlerValue(e.target.value))
            }
            readOnly={settings.readOnly}
            disabled={settings.readOnly}
            onFocus={this.setFocus}
            onMouseDown={this.setFocus}
            onBlur={() => this.handlerInput("blur")}
            placeholder={settings.placeholder || ""}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(InputMask);

InputMask.propTypes = {
  value: PropTypes.string,
  settings: PropTypes.object,
  callback: PropTypes.func,
};
