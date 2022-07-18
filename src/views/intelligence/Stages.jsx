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
      "<span class='title__elem'>Этапы</span> <span class='title__elem'>реализации</span> <span class='title__elem'>ИИ</span>",
    description:
      "*Управление и&nbsp;контроль этапами реализации (менеджмент). Тестирование и&nbsp;отладка (QA/QC). Взаимодействие со&nbsp;сторонними системами и&nbsp;сервисами (API). Размещение проекта на&nbsp;сервере (хостинг). Консультации и&nbsp;решение проблем. Техническая поддержка 12&nbsp;месяцев (бесплатно).",
    items: [
      {
        content: "Функциональные требования",
        start: 0,
        duration: 1.9,
      },
      {
        content: "Техническое задание",
        start: 1.9,
        duration: 8.3,
      },
      {
        content: "Анализ",
        start: 8.6,
        duration: 7.8,
      },
      {
        content: "Проектирование архитектуры",
        start: 15.1,
        duration: 8.8,
      },
      {
        content: "Создание ИИ",
        start: 21.4,
        duration: 55,
      },
      {
        content: "Упаковка ИИ в модуль",
        start: 67.7,
        duration: 18.9,
      },
      {
        content: "Интеграция модуля ИИ в бизнес",
        start: 81.7,
        duration: 13.2,
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
    return <Stages model={this.stages} link={4} />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(View);
