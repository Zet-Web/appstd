import React, { Component } from "react";

import Cases from "../../components/case/Cases.jsx";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  cases = [
    {
      key: "create-ii",
      type: "wide",
      isMulti: true,
      noSlider: true,
      nameKey: "AI creation",
      title: [
        {
          type: "text",
          content: "Подготовка к ИИ",
        },
        {
          type: "icon",
          content: "emodzi-14.png",
          class: "_icon14",
        },
      ],
      description: "3 последовательных этапа работ",
      tabs: [
        {
          key: "brief",
          nameKey: "Technical task",
          content: "Техническое задание",
        },
        {
          key: "analys",
          nameKey: "Analysis of AI models",
          content: "Анализ моделей ИИ",
        },
        {
          key: "dev",
          nameKey: "Integration system with AI",
          content: "Архитектура системы с ИИ",
        },
      ],
      content: {
        brief: [
          {
            type: "list",
            items: [
              "Описание идеи в тех документ",
              "Постановка задач машинного обучения",
              "Документирование ожидаемого результата",
            ],
          },
          {
            type: "about",
            content:
              "В&nbsp;ТЗ&nbsp;описывается: &laquo;что нужно достичь с&nbsp;помощью&nbsp;ИИ и&nbsp;дополнительных компонентов системы, а&nbsp;также, откуда будут браться входные данные, куда они будут попадать дальше (промежуточная обработка) и&nbsp;в&nbsp;каком виде и&nbsp;где должен будет выводиться итоговый результат системы (куда потом интегрироваться)&raquo;.",
          },
          {
            type: "price",
            price: "45 000",
            duration: "10 дней",
          },
        ],
        analys: [
          {
            type: "list",
            items: [
              "Поиск open source моделей",
              "Поиск APIs моделей",
              "Исследование найденных моделей",
            ],
          },
          {
            type: "about",
            content:
              "Осуществляется поиск подходящих open source и&nbsp;APIs решений (готовых моделей&nbsp;ИИ) для достижения необходимого результата из&nbsp;ТЗ. Проводится исследование найденных моделей (сторонний опыт, прогнозируемый результат, предполагаемый объем работ). Структурируется анализ.",
          },
          {
            type: "price",
            price: "22 500",
            duration: "5 дней",
          },
        ],
        dev: [
          {
            type: "list",
            items: [
              "Определение подходящей модели ИИ",
              "Фиксация сопутствующих технологий",
              "Проектирование архитектуры системы",
            ],
          },
          {
            type: "about",
            content:
              "На&nbsp;основании анализа определяется наиболее оптимальный и&nbsp;рациональный подход реализации (модель&nbsp;ИИ и&nbsp;сопутствующий инструментарий). После чего, проектируется архитектура системы (какая технология за&nbsp;что отвечает, как между ними происходит взаимодействие, создается диаграмма связей и&nbsp;т.д.).",
          },
          {
            type: "price",
            price: "38 250",
            duration: "7 дней",
          },
        ],
      },
      items: [
        {
          key: "brief",
          image: "screen-create-ii-1.png",
          name: "Скрин оглавления из ТЗ<br class='_elemDesktop'/>проекта Find by Face",
        },
        {
          key: "analys",
          image: "screen-create-ii-2.png",
          name: "Скрин из анализа<br class='_elemDesktop'/>проекта Find by Face",
        },
        {
          key: "dev",
          image: "screen-create-ii-3.png",
          name: "Скрин диаграммы связей из<br class='_elemDesktop'/> архитектуры проекта Find by Face",
        },
      ],
    },
    {
      key: "system-for-ii",
      type: "wide",
      isEmpty: true,
      noSlider: true,
      nameKey: "Ecosystem",
      title: [
        {
          type: "text",
          content: "Создание ИИ",
        },
        {
          type: "icon",
          content: "emodzi-20.png",
          class: "_icon20",
        },
      ],
      description: "Использование готовых моделей",
      content: [
        {
          type: "list",
          items: [
            "Настройка модели",
            "Подготовка данных",
            "Обучение модели",
            "Оценка результата",
            "Оптимизация"
          ],
        },
        {
          type: "about",
          content:
            "Создание искусственного интеллекта происходит в&nbsp;несколько повторяющихся этапов. Настройка готовой модели под требования из&nbsp;ТЗ. Сбор данных (структурируются имеющиеся, осуществляется поиск среди открытых источников либо создаются с&nbsp;нуля). Тренировка модели (т.е. обучение для получения желаемого результата от&nbsp;нее). Оценка результата (тестирование на&nbsp;данных, которые модель ранее не&nbsp;видела). Оптимизация (новые данные, тренировка, оценка).",
        },
        {
          type: "price",
          price: "675 000",
          duration: "45 дней",
        },
      ],
      items: [
        {
          key: "system-for-ii",
          image: "screen-system-for-ii-1.png",
        },
      ],
    },
    {
      key: "fullDev-ii",
      type: "wide",
      noSlider: true,
      nameKey: "Turnkey project",
      title: [
        {
          type: "text",
          content: "Система с ИИ",
        },
        {
          type: "icon",
          content: "emodzi-15.png",
          class: "_icon15",
        },
      ],
      description: "Реализация всей системы с ИИ под ключ",
      content: [
        {
          type: "list",
          items: [
            "Подготовка (ТЗ, Анализ, Архитектура)",
            "Создание ИИ (open source либо API модель)",
            "Реализация сопутствующих компонентов (Back-end, СУБД, админ-панель, API)",
            "Интеграция в бизнес (существующую ИТ-систему)",
          ],
        },
        {
          type: "about",
          content:
            "Эффективное решение задачи состоящее из&nbsp;реализации совокупности этапов, направленных на&nbsp;достижение требуемого результата. Выполнение подготовительных этапов осуществляется с&nbsp;учетом имеющейся ИТ-системы. Создание ИИ&nbsp;выполняется параллельно с&nbsp;разработкой сопутствующих компонентов. Система создается функционально масштабируемая и&nbsp;легко поддерживаемая.",
        },
        {
          type: "price",
          price: "1 575 000",
          duration: "120 дней",
        },
      ],
      items: [
        {
          key: "fullDev-ii",
          image: "screen-fullDev-ii-1.png",
        },
      ],
    },
  ];

  render() {
    const { elements } = this.props;

    return <Cases elements={elements} model={{ cases: this.cases }} />;
  }
}

export default View;
