import React, { Component } from "react";
import { connect } from "react-redux";
import Stages from "../../components/case/Stages";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  stages = {
    title:
      "<span class='title__elem'>Этапы</span> <span class='title__elem'>реализации</span> <br/><span class='title__elem'>маркетплейса</span>",
    description:
      "*Управление и контроль этапами реализации (менеджмент). Тестирование и отладка (QA/QC). Размещение и настройка back-end на сервере (хостинге). Подготовка и публикация приложения в сторы (App Store/Google Play). Техническая поддержка на 12 месяцев (бесплатно)",
    items: [
      {
        content: "Функциональные требования",
        start: 0,
        duration: 2.7,
      },
      {
        content: "Техническое задание",
        start: 2.7,
        duration: 18,
      },
      {
        content: "Дизайн UX/UI",
        start: 7.6,
        duration: 19,
      },
      {
        content: "Проектирование архитектуры",
        start: 23,
        duration: 6,
      },
      {
        content: "Back-end (веб-сервисы, БД, API)",
        start: 24.5,
        duration: 58,
      },
      {
        content: "Разработка iOS",
        start: 32,
        duration: 54.8,
      },
      {
        content: "Разработка Android",
        start: 32,
        duration: 54.8,
      },
      {
        content: "Интеграция с API",
        start: 42,
        duration: 44.8,
      },
      {
        content: "Админ-панель",
        start: 61,
        duration: 20,
      },
      {
        content: "Контроль достижения качества*",
        start: 0,
        duration: 100,
      },
    ],
    weeks: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
  };

  render() {
    return <Stages model={this.stages} />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(View);
