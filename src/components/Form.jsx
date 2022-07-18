import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Field from "./Field.jsx";
import Icon from "./Icon.jsx";
import handlerPopup from "../functions/handlerPopup.js";
import Button from "./Button.jsx";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      isLoad: false,
      files: [],
    };

    this.setFields = this.setFields.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  fields = [
    {
      key: "contacts-name",
      name: "name",
      support: "Имя",
      tag: "input",
    },
    {
      key: "contacts-phone",
      name: "phone",
      support: "Телефон или почта",
      tag: "input",
    },
    {
      key: "contacts-comments",
      name: "message",
      support: "Комментарий",
      tag: "area",
    },
  ];

  handlerInput(settings) {
    const { key, value } = settings;

    this.setState((state) => {
      const newState = { ...state };
      const fields = { ...newState.fields };

      fields[key].value = value;
      fields[key].error = null;

      newState.fields = fields;

      return newState;
    });
  }

  setFields() {
    this.formData = new FormData();
    this.setState((state) => {
      const newState = { ...state };
      const fields = {};

      this.fields.forEach((field) => {
        fields[field.key] = {
          value: "",
          error: null,
        };
      });

      newState.fields = fields;
      newState.files = [];

      return newState;
    });
  }

  setErrors(errors) {
    this.setState((state) => {
      const newState = { ...state };
      const { fields } = newState;

      this.fields.forEach((item) => {
        if (errors[item.name] && fields[item.key]) {
          fields[item.key].error = errors[item.name][0];
        }
      });

      newState.fields = fields;

      return newState;
    });
  }

  addFiles(filesAdding) {
    this.setState((state) => {
      const newState = { ...state };
      let { files } = newState;

      files = files.concat(filesAdding);

      newState.files = files;

      return newState;
    });
  }

  counterFile = 0;

  uploadFiles(e) {
    const { files } = e.target;
    const typesOfImage = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    const filesAdding = [];

    Object.keys(files).forEach((key) => {
      this.counterFile += 1;
      const file = files[key];
      let type = "other";

      if (typesOfImage.indexOf(file.type) !== -1) {
        type = "image";
      }

      this.formData.set(`file_${this.counterFile}`, file);

      filesAdding.push({ type, key: this.counterFile });
    });

    this.addFiles(filesAdding);
  }

  deleteFile(key) {
    this.setState((state) => {
      const newState = { ...state };
      const { files } = newState;
      const deleteIndex = files.findIndex((file) => file.key === key);

      files.splice(deleteIndex, 1);

      this.formData.delete(`file_${key}`);

      newState.files = files;

      return newState;
    });
  }

  formData = process.browser && new FormData();

  sendForm() {
    const { fields } = this.state;
    const errorsPrev = {};

    this.fields.forEach((item) => {
      this.formData.set(item.name, fields[item.key].value);
    });

    this.formData.set("url", encodeURI(window.location.href));

    if (!fields["contacts-name"].value) {
      errorsPrev.name = ["Введите ваше имя"];
    }

    if (!fields["contacts-phone"].value) {
      errorsPrev.phone = ["Укажите телефон либо почту"];
    }

    if (!fields["contacts-comments"].value) {
      errorsPrev.message = ["Опишите вводную информацию по задаче"];
    }

    if (Object.keys(errorsPrev).length === 0) {
      axios.post(`https://api.appsstudio.ru/v1/feedback/`, this.formData).then(
        (res) => {
          setLoad(false);
          if (res.data.code === 201) {
            this.setFields();
            handlerPopup("show", "successForm");
          }
        },
        (err) => {
          setLoad(false);
          const errors = err.response.data;
          if (errors.code === 400) {
            this.setErrors(errors);
          } else {
            handlerPopup("show", "errorForm", {
              callback: () => {
                this.sendForm();
              },
            });
          }
        }
      );

      const setLoad = (isLoad) =>
        new Promise((resolve) => {
          this.setState(
            (state) => {
              const newState = { ...state };

              newState.isLoad = isLoad;

              if (
                this.props.setLoad &&
                typeof this.props.setLoad === "function"
              ) {
                this.props.setLoad(isLoad);
              }

              return newState;
            },
            () => {
              resolve();
            }
          );
        });
      setLoad(true);
    } else {
      this.setErrors(errorsPrev);
    }
  }

  getTitle() {
    const { type } = this.props;

    switch (type) {
      case "fast":
        return "Быстрый заказ";

      default:
        return "Оставить заявку";
    }
  }

  componentDidMount() {
    this.setFields();
  }

  render() {
    const { fields, isLoad, files } = this.state;
    const { type } = this.props;

    return (
      <div
        className={`form ${isLoad === true ? "_isLoad" : ""} ${
          (type && `_${type}`) || ""
        }`}
      >
        <div className={`form__loader`}>
          <div className="loader">
            <i className="loader__icon">
              <Icon name="loader" />
            </i>
            <p className="loader__description">Форма отправляется</p>
          </div>
        </div>
        <h4 className="form__title">{this.getTitle()}</h4>
        <div className="form__fields">
          {this.fields.map((field, key) => (
            <div className="form__field" key={key}>
              <Field
                model={{ ...field, value: fields[field.key]?.value }}
                callback={this.handlerInput}
                error={fields[field.key]?.error}
              />
            </div>
          ))}
        </div>
        <div className="form__actions">
          <div className="form__files">
            {files
              .filter((file, key) => (files.length > 3 ? key <= 1 : true))
              .map((file, key) => (
                <div className="form__preview" key={key}>
                  <i
                    className="form__previewDelete"
                    onClick={() => {
                      this.deleteFile(file.key);
                    }}
                  >
                    <Icon name="file-delete" />
                  </i>
                  <i className="form__previewIcon">
                    <Icon
                      name={
                        file.type === "image" ? "file-type-2" : "file-type-1"
                      }
                    />
                  </i>
                </div>
              ))}
            {files.length > 3 && (
              <div className="form__preview _more">+{files.length - 2}</div>
            )}
            <label className="form__file">
              <input
                type="file"
                className="form__fileInput"
                multiple
                onChange={this.uploadFiles}
              />
              <div className="form__fileView">
                <div className="form__fileBox">
                  <i className="form__fileIcon">
                    <Icon name="form-file" />
                  </i>
                </div>
                {files.length === 0 && (
                  <p className="form__fileContent">Прикрепить файл</p>
                )}
              </div>
            </label>
          </div>

          <div
            className="form__button"
            onClick={() => {
              this.sendForm();
            }}
          >
            <Button classes="_main" content="Отправить" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    device: state.device,
  };
}

export default connect(mapStateToProps)(Form);
