import React, { Component } from "react";

import Cases from "../../components/case/Cases.jsx";

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  cases = [
    {
      key: "design2",
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
      description: "Сделаем дизайн приложения, гордостью вашего бизнеса",
      tabs: [
        {
          key: "func",
          nameKey: "Functional",
          content: "Функциональный",
        },
        {
          key: "pro",
          nameKey: "Pro",
          content: "Pro",
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
              "Проникнемся корпоративным стилем и бизнес-процессами, изучим предпочтения, определим сильные стороны, создадим трендовый, стильный и удобный интерфейс с учётом гайдлайнов iOS / Android",
          },
          {
            type: "price",
            price: "150 750",
            duration: "17 дней",
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
              "Оптимизация бизнес-процессов. Создание нового мобильного стиля. Проработка дизайна до стадии превосходства. Клёвые анимашки, детализированный screen map и user flow, UIKit, активный прототип. Работа над вовлечённостью и Up-sell. Сделаем все доп правки",
          },
          {
            type: "price",
            price: "276 750",
            duration: "25 дней",
          },
        ],
      },
      items: {
        func: {
          logo: "icon-rjd.png",
          name: "Пример функционального дизайна",
          items: [
            {
              image: "screen-func-design-1.png",
            },
            {
              image: "screen-func-design-2.png",
            },
            {
              image: "screen-func-design-3.png",
            },
          ],
        },
        pro: {
          logo: "icon-eatRepeat.png",
          name: "Пример Pro дизайна",
          items: [
            {
              image: "screen-func-pro-1.png",
              logo: "icon-eatRepeat.png",
              name: "Eat Repeat",
            },
            {
              image: "screen-func-pro-2.png",
              logo: "icon-dener.svg",
              name: "Сеньор Денёр",
            },
            {
              image: "screen-func-pro-3.png",
              logo: "icon-inClik.svg",
              name: "In Clik",
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
          content: "&nbsp;+",
        },
        {
          type: "text",
          content: "Интеграция",
        },
        {
          type: "text",
          content: "&nbsp;с API",
        },
      ],
      description: "Когда у Вас <b>УЖЕ ЕСТЬ</b>:",
      content: [
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
            "Исключим подводные камни в ТЗ, проработаем Дизайн на логику и недостающие сценарии, спроектируем эффективную Архитектуру, разработаем качественные «нативные» Мобильные приложения, интегрируем их с существующим API или поможем его создать",
        },
        {
          type: "price",
          price: "562 500",
          duration: "2 месяцев",
        },
      ],
      items: [
        {
          image: "screen-ios-android-1.png",
          logo: "icon-inClik.svg",
          name: "Пример проекта “In Clik”",
        },
        {
          image: "screen-ios-android-2.png",
          logo: "icon-pizza.png",
          name: "Пример проекта “PizzaHouse”",
        },
        {
          image: "screen-ios-android-3.png",
          logo: "icon-rjd.png",
          name: "Пример проекта “RZD-online”",
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
            "Лучшее качество на рынке",
            "Создание мобильной экосистемы",
            "Долгосрочно и масштабируемо",
          ],
        },
        {
          type: "about",
          content:
            "Разберёмся в ваших ИТ-системах и опишем все ТЗ, создадим крутой Дизайн с гарантированными заказами на выходе, разработаем лучшие «нативные» Приложения, реализуем современный Back-end с админ-панелью (CRM) и соберём все в одну Мобильную экосистему с последующей ее поддержкой и возможностью масштабироваться",
        },
        {
          type: "price",
          price: "897 750",
          duration: "3 месяцев",
        },
      ],
      items: [
        {
          image: "screen-fullDev-1.png",
          logo: "icon-eatRepeat.png",
          name: "Пример проекта “eat repeat”",
        },
        {
          image: "screen-fullDev-2.png",
          logo: "icon-mercada.svg",
          name: "Пример проекта “Mercada”",
        },
        {
          image: "screen-fullDev-3.png",
          logo: "icon-dener.svg",
          name: "Пример проекта “Senior Dener”",
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
