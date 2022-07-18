import React, { Component } from "react";
import { connect } from "react-redux";

import Stages from "../../components/case/Stages.jsx";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  stages = {
    title:
      "<span class='title__elem'>Этапы</span> <span class='title__elem'>реализации</span> <br/><span class='title__elem'>онлайн-магазина</span>",
    description:
      "*Управление и контроль этапами реализации (менеджмент). Тестирование и отладка (QA/QC). Взаимодействие со сторонними системами и сервисами. Подготовка и публикация приложений в App Store и Google Play. Техническая поддержка на 12 месяцев (бесплатно)",
    items: [
      {
        content: "Функциональные требования",
        start: 0,
        duration: 2.4,
      },
      {
        content: "Анализ инфраструктуры",
        start: 0,
        duration: 3.5,
      },
      {
        content: "Техническое задание",
        start: 3.5,
        duration: 20,
      },
      {
        content: "Дизайн UX/UI",
        start: 9,
        duration: 21.5,
      },
      {
        content: "Проектирование архитектуры",
        start: 26.5,
        duration: 7.3,
      },
      {
        content: "Создание API",
        start: 28,
        duration: 62.5,
      },
      {
        content: "Разработка iOS",
        start: 36,
        duration: 63,
      },
      {
        content: "Разработка Android",
        start: 36,
        duration: 63,
      },
      {
        content: "Интеграция с API",
        start: 48,
        duration: 51,
      },
      {
        content: "Контроль достижения качества*",
        start: 0,
        duration: 100,
      },
    ],
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };

  render() {
    return <Stages model={this.stages} />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(View);
