import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Services from "../../components/case/Services";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          header: "Разработка ИИ",
          sub_header: "Выбор платформы, создание и обучение модели",
          description: "",
          techs: [
            {
              name: "Фреймворки и Библиотеки для Python:",
              value: "PyTorch, PyTorch Lightning, Fast.ai, TensorFlow, OpenCV",
            },
            {
              name: "Готовые модели и APIs:",
              value:
                "Machine learning from Apple / Google, MTCNN (facenet-pytorch), InceptionResnetV1 (VGGFace2), BERT DeepPavlov, ruGPT-3",
            },
            {
              name: "SaaS решения:",
              value:
                "Plate Recognizer, Amazon SageMaker, Amazon Vision, Yandex DataSphere, Yandex Vision, Azure Computer Vision, Azure Decision, BERT от Google",
            },
          ],
        },
        {
          header: "Экосистема для ИИ",
          sub_header: "Связка из back-end’а и мобильного приложения",
          description: "",
          techs: [
            {
              name: "Дизайн UX/UI:",
              value: "Figma, After Effects",
            },
            {
              name: "iOS:",
              value: "MVVM для iOS с Combine и SwiftUI",
            },
            {
              name: "Android:",
              value: "MVVM для Android с Kotlin и Android Studio",
            },
            {
              name: "Back-end:",
              value: "Python, Django, Docker, Swagger",
            },
            {
              name: "СУБД:",
              value: "PostgreSQL, MongoDB",
            },
            {
              name: "Элементы соц сети:",
              value:
                "Чат (тет-а-тет, групповой), Инвайты, Подписчики, Подписки, Рейтинг, Отзывы, Пожаловаться",
            },
            {
              name: "Контроль качества:",
              value: "Trello, GitLab, Telegram, Google Workspace",
            },
          ],
        },
        {
          header: "Функционал ИИ",
          sub_header: "Искусственный интеллект может многое",
          description: "",
          techs: [
            {
              name: "Зрение:",
              value:
                "Обнаружение объектов, Обнаружение дефектов, Подсчет кол-ва объектов, Обнаружение аномалий, Обнаружение отклонений, Определение закономерностей",
            },
            {
              name: "Данные:",
              value:
                "Прогнозирование события / действия / заболевания, Формирование рекомендаций, Выявление закономерностей, Поиск аномалий",
            },
            {
              name: "Речь:",
              value:
                "Распознование слов из «Аудио / Видео / Файла / Речи», а затем преобразование их в текст",
            },
            {
              name: "Звук:",
              value:
                "Определение источника звука, его характеристики или композиции",
            },
          ],
        },
      ],
    };
  }

  getStages() {
    return new Promise((resolve) => {
      axios.get(`https://api.appsstudio.ru/v1/category/ai`).then((res) => {
        const { parts } = res.data;

        this.setState(
          (state) => {
            const newState = { ...state };

            newState.cards = parts;

            return newState;
          },
          () => {
            resolve();
          }
        );
      });
    });
  }

  componentDidMount() {
    this.getStages().then(() => {
      // console.log(this.state.cards);
    });
  }

  render() {
    // console.log(this.state.cards);
    return <Services model={{ cards: this.state.cards }} />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(View);
