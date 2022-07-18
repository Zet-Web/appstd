import React, { Component } from "react";

import Cases from "../../components/case/Cases.jsx";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  cases = [
    {
      key: "design",
      type: "wide",
      isMulti: true,
      nameKey: "Design",
      title: [
        {
          type: "text",
          content: "Дизайн UX/UI",
        },
        {
          type: "icon",
          content: "emodzi-9.png",
          class: "_icon9",
        },
      ],
      description: "Сделаем дизайн приложения, гордостью вашей площадки",
      tabs: [
        {
          key: "func",
          content: "Функциональный",
          nameKey: "functional",
        },
        {
          key: "pro",
          content: "Pro",
          nameKey: "Pro",
        },
      ],
      content: {
        func: [
          {
            type: "list",
            items: [
              "Согласно предоставленному стилю",
              "2 правки на каждый экран",
              "iOS либо Android",
            ],
          },
          {
            type: "about",
            content:
              "Создадим несколько стилистических вариантов. Продумаем удобство и простоту взаимодействия (User-Friendly) в рамках гайдлайнов. Свяжем базовую логику в активный прототип. Передадим исходник с инструкцией на разработку",
          },
          {
            type: "price",
            price: "202 500",
            duration: "23 дней",
          },
        ],
        pro: [
          {
            type: "list",
            items: [
              "Несколько вариантов дизайна",
              "5 правок на каждый экран",
              "iOS + Android",
              "Темная (ночная) тема",
            ],
          },
          {
            type: "about",
            content:
              "Оптимизация бизнес-модели. Создание нового мобильного стиля. Проработка дизайна до стадии превосходства. Клёвые анимашки, детализированный screen map и user flow, UIKit, активный прототип. Работа над удержанием и вовлечённостью. Сделаем все доп правки",
          },
          {
            type: "price",
            price: "326 250",
            duration: "32 дня",
          },
        ],
      },
      items: {
        func: {
          logo: "icon-lex.svg",
          name: "Пример функционального дизайна",
          items: [
            {
              image: "screen-design-func-market-1.png",
            },
            {
              image: "screen-design-func-market-2.png",
            },
            {
              image: "screen-design-func-market-3.png",
            },
          ],
        },
        pro: {
          logo: "icon-weGo.png",
          name: "Пример Pro дизайна",
          items: [
            {
              image: "screen-design-pro-market-1.png",
            },
            {
              image: "screen-design-pro-market-2.png",
            },
            {
              image: "screen-design-pro-market-3.png",
            },
          ],
        },
      },
    },
    {
      key: "ios-android",
      type: "wide",
      isEmpty: true,
      nameKey: "iOS+Android+API",
      title: [
        {
          type: "text",
          content: "iOS",
        },
        {
          type: "text",
          content: "&nbsp;+&nbsp;",
        },
        {
          type: "text",
          content: "Android",
        },
        {
          type: "text",
          content: "&nbsp;+&nbsp;",
        },
        {
          type: "text",
          content: "Интеграция&nbsp;",
        },
        {
          type: "text",
          content: "с API",
        },
      ],
      content: [
        {
          type: "description",
          content: "Когда у Вас <b>УЖЕ ЕСТЬ</b>:",
        },
        {
          type: "list",
          items: ["ТЗ", "Дизайн", "Back-end (API)"],
        },
        {
          type: "description",
          content: "и <b>НУЖНО ТОЛЬКО</b> разработать приложение",
        },
        {
          type: "about",
          content:
            "Оптимизируем ТЗ, дополним недостающие сценарии в Дизайне, спроектируем оптимальную Архитектуру, разработаем «нативные» Мобильные приложения, интегрируем Back-end, окажем Тех поддержку и поможем в Масштабировании",
        },
        {
          type: "price",
          price: "843 750",
          duration: "3 месяцев",
        },
      ],
      items: [
        {
          image: "screen-app-market-1.png",
          logo: "icon-ibibook.png",
          name: "Пример проекта iBibook",
        },
        {
          image: "screen-app-market-2.png",
          logo: "icon-taxi.png",
          name: "Пример проекта Все такси города + Я попутчик",
        },
        {
          image: "screen-app-market-3.png",
          logo: "icon-wellness.png",
          name: "Пример проекта Wellness",
        },
      ],
    },
    {
      key: "fullDev",
      type: "wide",
      nameKey: "Turnkey project",
      title: [
        {
          type: "text",
          content: "Под ключ",
        },
        {
          type: "icon",
          content: "emodzi-10.png",
          class: "_icon10",
        },
      ],
      description:
        "ТЗ, Дизайн, iOS, Android, <br class='_elemMobile' />Back-end, <br class='_elemDesktop' />Админ-панель, <br class='_elemMobile' />Интеграция с API",
      content: [
        {
          type: "list",
          items: [
            "Автоматизация процессов",
            "Создание мобильной экосистемы",
            "Управление, контроль, аналитика",
          ],
        },
        {
          type: "about",
          content:
            "Оптимизация бизнес-модели и выявление подводных камней в ТЗ. Создание user-friendly Дизайна на перекрёстке технологий и искусства. Разработка Приложений на лучших «нативных» технологиях. Реализация крутого Back-end с админ-панелью. Архитектура мобильной экосистемы с автоматизацией процессов, поддержкой и масштабированием",
        },
        {
          type: "price",
          price: "1 462 500",
          duration: "4 месяцев",
        },
      ],
      items: [
        {
          image: "screen-full-market-1.png",
          logo: "icon-weGo.png",
          name: "Пример проекта WeGo",
        },
        {
          image: "screen-full-market-2.png",
          logo: "icon-aParty.svg",
          name: "Пример проекта aParty",
        },
        {
          image: "screen-full-market-3.png",
          logo: "icon-lex.svg",
          name: "Пример проекта LEX",
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
