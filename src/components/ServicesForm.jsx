import React, { Component } from "react";
import axios from "axios";

import TimeSelect from "./TimeSelect.jsx";
import Field from "./Field.jsx";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
import handlerPopup from "../functions/handlerPopup";
import getFormatedPrice from "../functions/getFormatedPrice.js";
import getEndPhrase from "../functions/getEndPhrase.js";
import InputMask from "./InputMask.jsx";

class ServicesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthStep: 0,
      currentStep: 0,
      time_from: {
        value: "",
        key: 30,
      },
      time_to: {
        value: "",
        key: 43,
      },
      contact_method: [],
      errors: [],
      files: [],
      isLoad: false,
    };

    this.handlerTime = this.handlerTime.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);

    this.parent = React.createRef();
  }

  socials = [
    {
      key: "wa",
      content: "WhatsApp",
      icon: "icon-wa.svg",
    },
    {
      key: "tg",
      content: "Telegram",
      icon: "icon-tg.svg",
    },
    {
      key: "viber",
      content: "Viber",
      icon: "icon-viber.svg",
    },
    {
      key: "skype",
      content: "Skype",
      icon: "icon-skype.svg",
    },
    {
      key: "ft",
      content: "FaceTime",
      icon: "icon-ft.svg",
    },
    {
      key: "phone",
      content: "Phone",
      icon: "icon-phone.svg",
    },
  ];

  fields = {
    name: {
      support: "Имя",
      tag: "input",
      isRequired: true,
    },
    phone: {
      support: "Контакт",
      tag: "input",
      isRequired: true,
    },
    message: {
      support: "Описание идеи и детали проекта",
      tag: "area",
      classes: "_height",
    },
  };

  setWidthStep() {
    this.setState((state) => {
      const newState = { ...state };

      newState.widthStep =
        this.parent.current && this.parent.current.offsetWidth;

      return newState;
    });
  }

  handlerStep(step) {
    this.setState((state) => {
      const newState = { ...state };

      newState.currentStep = step;

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

      filesAdding.push({ type, key: this.counterFile, name: file.name });
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

  handlerTime({ name, value, key }) {
    this.setState((state) => {
      const newState = { ...state };
      const time = newState[name];
      const errors = [...newState.errors];
      const indexError = errors.findIndex((error) => error.name === name);

      time.key = key;
      time.value = value;

      newState[name] = time;

      if (
        name === "time_from" &&
        newState.time_from.key > newState.time_to.key
      ) {
        newState.time_to = { ...time };
      }

      if (name === "time_to" && newState.time_to.key < newState.time_from.key) {
        newState.time_from = { ...time };
      }

      if (indexError !== -1) {
        errors.splice(indexError, 1);
      }

      newState.errors = errors;

      return newState;
    });
  }

  handlerSocial(key) {
    this.setState((state) => {
      const newState = { ...state };
      const errors = [...newState.errors];
      const contact_method = [...newState.contact_method];

      const indexError = errors.findIndex(
        (error) => error.name === "contact_method"
      );
      const indexSocial = contact_method.indexOf(key);

      if (indexError !== -1) {
        errors.splice(indexError, 1);
      }

      if (indexSocial !== -1) {
        contact_method.splice(indexSocial, 1);
      } else {
        contact_method.push(key);
      }

      newState.errors = errors;
      newState.contact_method = contact_method;

      return newState;
    });
  }

  handlerInput({ key, value }) {
    return new Promise((resolve) => {
      this.setState(
        (state) => {
          const newState = { ...state };
          const fields = { ...newState.fields };
          const errors = [...newState.errors];
          const indexError = errors.findIndex((error) => error.name === key);

          fields[key].value = value;

          if (indexError !== -1) {
            errors.splice(indexError, 1);
          }

          newState.errors = errors;
          newState.fields = fields;

          return newState;
        },
        () => {
          resolve();
        }
      );
    });
  }

  setErrors(errors) {
    this.setState((state) => {
      const newState = { ...state };

      newState.errors = errors;

      return newState;
    });
  }

  formData = new FormData();

  sendForm() {
    const { fields, contact_method } = this.state;
    const { model, callbackSuccessSend } = this.props;
    const errorsPrev = [];

    this.formData.set("url", encodeURI(window.location.href));

    Object.keys(fields).forEach((key) => {
      this.formData.set(key, fields[key].value);
    });

    ["time_from", "time_to"].forEach((key) => {
      this.formData.set(key, this.state[key].value);
    });

    if (contact_method.length) {
      this.formData.set(
        "contact_method",
        contact_method
          .map((item) => this.socials.find((el) => el.key === item).content)
          .join(", ")
      );
    } else {
      this.formData.delete("contact_method");
    }

    this.formData.set("service", model.id);

    if (contact_method.length === 0) {
      errorsPrev.push({
        name: "contact_method",
        content: "Куда писать?",
      });
    }

    if (!fields.name.value) {
      errorsPrev.push({
        name: "name",
        content: "Как вас зовут?",
      });
    } else if (fields.name.value.length <= 3) {
      errorsPrev.push({
        name: "name",
        content: "Поле должно быть заполнено минимум из 3-х символов",
      });
    }

    if (!fields.phone.value) {
      errorsPrev.push({
        name: "phone",
        content: "Какой номер?",
      });
    }

    if (!fields.message.value) {
      errorsPrev.push({
        name: "message",
        content: "Что нужно сделать?",
      });
    }

    if (errorsPrev.length === 0) {
      axios
        .post(
          `https://api.appsstudio.ru/v1/feedback/interactive`,
          this.formData
        )
        .then(
          (res) => {
            setLoad(false);
            if (res.data.code === 201) {
              this.setFields();
              handlerPopup("show", "successForm", { name: "interactive" });

              if (
                callbackSuccessSend &&
                typeof callbackSuccessSend === "function"
              ) {
                callbackSuccessSend();
              }
            }
          },
          (err) => {
            setLoad(false);
            const errors = err.response.data;

            if (errors.code === 400) {
              const errorsState = [];

              [
                "message",
                "name",
                "phone",
                "time_from",
                "time_to",
                "contact_method",
              ].forEach((name) => {
                if (errors[name]) {
                  errorsState.push({
                    name,
                    content: errors[name][0],
                  });
                }
              });

              this.setErrors(errorsState);
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

  setFields() {
    this.setState((state) => {
      const newState = { ...state };
      const fields = {};

      Object.keys(this.fields).forEach((name) => {
        fields[name] = {
          value: "",
        };
      });

      // newState.time_from = {
      //   value: "",
      //   key: null,
      // };
      // newState.time_to = {
      //   value: "",
      //   key: null,
      // };
      newState.fields = fields;
      newState.contact_method = [];
      newState.errors = [];

      return newState;
    });
  }

  componentDidMount() {
    this.setWidthStep();
    this.setFields();
  }

  render() {
    const {
      widthStep,
      currentStep,
      fields,
      errors,
      contact_method,
      files,
      isLoad,
      time_from,
      time_to,
    } = this.state;
    const styleStep =
      (widthStep && {
        width: widthStep,
      }) ||
      {};
    const { model, color } = this.props;

    return (
      <div ref={this.parent} className="servicesForm _marketplace">
        <div
          className={`servicesForm__loader ${isLoad === true ? "_isLoad" : ""}`}
        >
          <div className="servicesForm__loaderInner">
            <div className="loader">
              <i className="loader__icon">
                <Icon name="loader" />
              </i>
              <p className="loader__description">Форма отправляется</p>
            </div>
          </div>
        </div>

        <div
          className="servicesForm__steps"
          style={{ transform: `translate(${-widthStep * currentStep}px,0)` }}
        >
          <div className="servicesForm__step" style={styleStep}>
            <div className="servicesForm__head">
              <div className="servicesForm__headInfo">
                <div
                  className="servicesForm__headInfoBack"
                  style={(color && { background: color }) || {}}
                ></div>
                <p className="servicesForm__headInfoContent">
                  от <span>{model && getFormatedPrice(model.price)}</span> руб
                </p>
                <p className="servicesForm__headInfoContent">
                  от {model && model.terms}
                  {` `}
                  {model && getEndPhrase(model.terms, ["дня", "дня", "дней"])}
                </p>
              </div>
              <div
                className="servicesForm__headButton"
                onClick={() => this.handlerStep(1)}
              >
                <Button classes="_main" content="Заказать" />
              </div>
            </div>
            <div className="servicesForm__info">
              <div className="servicesForm__infoInner">
                <h3>{model?.header}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: model?.description }}
                ></div>
              </div>
            </div>
          </div>
          <div className="servicesForm__step" style={styleStep}>
            <div className="servicesForm__form">
              <div className="servicesForm__formInner">
                <h3 className="servicesForm__formTitle">
                  Укажите время и мессенджеры для связи
                </h3>
                <div className="servicesForm__formInfo">
                  <div className="servicesForm__formTimes">
                    <p className="servicesForm__formTimesSupport">С</p>
                    <div className="servicesForm__formTimesSelect">
                      <TimeSelect
                        name="time_from"
                        handler={this.handlerTime}
                        value={time_from.key}
                        max={time_to.key}
                        isError={
                          errors.find((error) => error.name === "time_from")
                            ?.content
                        }
                      />
                    </div>
                    <p className="servicesForm__formTimesSupport">До</p>
                    <div className="servicesForm__formTimesSelect">
                      <TimeSelect
                        name="time_to"
                        handler={this.handlerTime}
                        value={time_to.key}
                        min={time_from.key}
                        isError={
                          errors.find((error) => error.name === "time_to")
                            ?.content
                        }
                      />
                    </div>
                  </div>
                  <div className="servicesForm__formSocials">
                    {this.socials.map((social, key) => (
                      <label className="servicesForm__formSocial" key={key}>
                        <input
                          type="checkbox"
                          className="servicesForm__formSocialInput"
                          onChange={() => this.handlerSocial(social.key)}
                          checked={contact_method.indexOf(social.key) !== -1}
                        />
                        <div className="servicesForm__formSocialView">
                          <img
                            src={
                              require(`../img/servicesForm/${social.icon}`)
                                .default.src
                            }
                            alt=""
                            className="servicesForm__formSocialIcon"
                          />
                        </div>
                      </label>
                    ))}
                    {errors &&
                      errors.find(
                        (error) => error.name === "contact_method"
                      ) && (
                        <p className="servicesForm__formSocialsError">
                          {
                            errors.find(
                              (error) => error.name === "contact_method"
                            ).content
                          }
                        </p>
                      )}
                  </div>
                </div>
                <div className="servicesForm__formFields">
                  <div className="servicesForm__formField">
                    <Field
                      model={{
                        ...this.fields.name,
                        key: "name",
                        value: (fields && fields.name.value) || "",
                      }}
                      callback={this.handlerInput}
                      error={
                        errors.find((error) => error.name === "name")?.content
                      }
                    />
                  </div>
                  <div className="servicesForm__formField">
                    <InputMask
                      value={(fields && fields.phone.value) || ""}
                      callback={(dataCallback) =>
                        new Promise((resolve) => {
                          const { value } = dataCallback;

                          this.handlerInput({ key: "phone", value }).then(
                            () => {
                              resolve();
                            }
                          );
                        })
                      }
                      settings={{
                        field: { ...this.fields.phone },
                        class: "field__input",
                        template: "_-___-___-__-__",
                        charDel: "-",
                        charEmpty: "_",
                        validate: "phone",
                        name: "phone",
                        readOnly: false,
                        error: errors.find((error) => error.name === "phone")
                          ?.content,
                      }}
                    />
                  </div>
                </div>
                <div className="servicesForm__formTask">
                  <h3 className="servicesForm__formTitle">Опишите задачу</h3>
                  <p className="servicesForm__formTaskAbout">
                    Понимание идеи предстоящей задачи позволяет задать
                    уточняющие вопросы по сути
                  </p>
                  <div className="servicesForm__formTaskField">
                    <Field
                      model={{
                        ...this.fields.message,
                        key: "message",
                        value: (fields && fields.message.value) || "",
                      }}
                      callback={this.handlerInput}
                      error={
                        errors.find((error) => error.name === "message")
                          ?.content
                      }
                    />
                  </div>
                </div>
                <div className="servicesForm__formFoot">
                  <div className="servicesForm__formFiles">
                    {files
                      .filter((file, key) =>
                        files.length > 3 ? key <= 1 : true
                      )
                      .map((file, key) => (
                        <div className="servicesForm__formFile" key={key}>
                          <div className="servicesForm__formFileHead">
                            <i
                              className="servicesForm__formFileDelete"
                              onClick={() => {
                                this.deleteFile(file.key);
                              }}
                            >
                              <Icon name="file-delete" />
                            </i>
                            <i className="servicesForm__formFileIcon">
                              <Icon
                                name={
                                  file.type === "image"
                                    ? "file-type-2"
                                    : "file-type-1"
                                }
                              />
                            </i>
                          </div>
                          <p className="servicesForm__formFileName">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    {files.length > 3 && (
                      <div className="servicesForm__formFile _more">
                        <div className="servicesForm__formFileHead">
                          +{files.length - 2}
                        </div>
                      </div>
                    )}
                    <label className="servicesForm__formUpload">
                      <input
                        type="file"
                        className="servicesForm__formUploadInput"
                        multiple
                        onChange={this.uploadFiles}
                      />
                      <div className="servicesForm__formUploadBtn">
                        <i className="servicesForm__formUploadBtnIcon">
                          <Icon name="form-file" />
                        </i>
                      </div>
                      {files.length === 0 && (
                        <p className="servicesForm__formUploadContent">
                          Прикрепить
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="servicesForm__formActions">
                    <div
                      className="servicesForm__formAction"
                      onClick={() => this.handlerStep(0)}
                    >
                      <div className="button _back">Назад</div>
                    </div>
                    <div
                      className="servicesForm__formAction _main"
                      onClick={() => this.sendForm()}
                    >
                      <Button classes="_main" content="Отправить" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServicesForm;
