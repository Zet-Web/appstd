import React, { Component } from "react";
import { connect } from "react-redux";

import setSpacesInText from "../../functions/setSpacesInText";
import HandlerAnimate from "../../classes/HandlerAnimate";
import LazyImage from "../../components/LazyImage";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.paralaxAnimate = this.paralaxAnimate.bind(this);

    this.parent = React.createRef();
  }

  items = [
    {
      title: [
        {
          key: "text",
          content: "Наша",
        },
        {
          key: "icon",
          content: "emodzi-4.png",
          name: "_icon4",
        },
        {
          key: "text",
          content: "фишка!",
        },
      ],
      subTitle:
        "<span>Бесплатная</span> техническая поддержка <span>12 месяцев!</span>",
      descriptions: [
        "Гарантийное обслуживание проекта - must have этап. Наши клиенты спят спокойно и всегда уверены, что в случае технических неполадок, им оперативно все поправят.",
        "А когда необходимо будет расширить возможности приложения, им также всегда есть к кому обратиться за помощью и профессиональным советом.",
      ],
      image: "image-about-1.png",
      paralax: [1, 1],
    },
    {
      title: [
        {
          key: "text",
          content: "По оплатам",
        },
        {
          key: "icon",
          content: "emodzi-5.png",
          name: "_icon5",
        },
        {
          key: "text",
          content: "договоримся",
        },
      ],
      subTitle:
        "Разделим стоимость разработки на <span>подходящие ежемесячные платежи</span>",
      descriptions: [
        "Нам не нужен большой аванс чтобы начать работу. Обычно, 5% от общей стоимости вполне достаточно. И всегда одну оплату оставляем постфактум.",
        "Если стоит вопрос в подходящих ежемесячных платежах, найдём вариант чтобы их удовлетворить и реализовать все задуманное.",
      ],
      image: "image-about-2.png",
      paralax: [-1, -1],
    },
    {
      title: [
        {
          key: "text",
          content: "Подход вне",
        },
        {
          key: "icon",
          content: "emodzi-6.png",
          name: "_icon6",
        },
        {
          key: "text",
          content: "рамок",
        },
      ],
      subTitle:
        "<span>Качественно. Технологично. Комплексно.</span><br/><span class='_min'>Минимум действий от Заказчика.</span>",
      descriptions: [
        "Додумываем идею. Делаем крутой дизайн. Пишем на лучших технологиях. Подбираем реально оптимальные и современные системы для интеграции, рассказываем за их «плюсы» и «минусы». Сами побеждаем их тех. поддержку.",
        "Рады делать то, что раньше не делали. Наймем административный штат и поможем собрать команду in-house для дальнейшей поддержки. Плечом к плечу готовы доносить целесообразность создания проекта инвестору.",
      ],
      image: "image-about-3.png",
      paralax: [1, -1],
    },
  ];

  paralaxAnimate(e) {
    const { startPositionCursor } = this.props;
    const { x, y, isInit } = startPositionCursor;

    let { clientX, clientY } = e;
    clientX -= x || 0;
    clientY -= y || 0;

    if (isInit) {
      this.parent.current
        .querySelectorAll(".indexAbout__itemImage")
        .forEach((image, key) => {
          const settings = this.items[key].paralax;

          image.style.transform = `translate3d(${
            (settings[0] * clientX) / 75
          }px,${(settings[1] * clientY) / 75}px,0)`;
        });

      this.parent.current
        .querySelectorAll(".indexAbout__itemImageBack")
        .forEach((image, key) => {
          const settings = this.items[key].paralax;

          image.style.transform = `translate3d(${
            (-settings[0] * clientX) / 75
          }px,${(-settings[1] * clientY) / 75}px,0)`;
        });
    }
  }

  componentDidMount() {
    this.handlerAnimate = new HandlerAnimate({
      type: "title",
      parent: this.parent.current,
    });

    this.handlerAnimate.init();
    this.handlerAnimate.handler();

    this.handlerAnimateText = new HandlerAnimate({
      type: "text",
      classParent: ".textAnimate",
      parent: this.parent.current,
    });

    this.handlerAnimateText.init();
    this.handlerAnimateText.handler();

    document.addEventListener("mousemove", this.paralaxAnimate);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.paralaxAnimate);
  }

  render() {
    return (
      <div ref={this.parent} className="indexAbout">
        <div className="indexAbout__inner">
          <div className="indexAbout__items">
            {this.items.map((item, key) => (
              <div className={`indexAbout__item _step${key + 1}`} key={key}>
                <div className="indexAbout__itemContent">
                  <div className="indexAbout__itemTitle">
                    <h3 className="title _mediumSizeTablet">
                      {item.title.map((titleItem, titleKey) => (
                        <>
                          {titleItem.key === "text" && (
                            <span key={titleKey} className="title__elem">
                              {titleItem.content}
                            </span>
                          )}
                          {titleItem.key === "icon" && (
                            <i
                              className={`title__elem _icon title__icon ${titleItem.name}`}
                              key={titleKey}
                            >
                              <img
                                src={
                                  require(`../../img/emodzi/${titleItem.content}`)
                                    .default.src
                                }
                                alt=""
                                className="title__iconItem"
                              />
                            </i>
                          )}
                        </>
                      ))}
                    </h3>
                  </div>
                  <h4
                    className="textAnimate indexAbout__itemSubtitle"
                    dangerouslySetInnerHTML={{ __html: item.subTitle }}
                  />
                  <div className="indexAbout__itemDescriptions">
                    {item.descriptions.map((description, keyDescription) => (
                      <p
                        className="textAnimate indexAbout__itemDescription"
                        dangerouslySetInnerHTML={{
                          __html: setSpacesInText(description),
                        }}
                        key={keyDescription}
                      />
                    ))}
                  </div>
                </div>
                <div className="indexAbout__itemImageBox">
                  <div className="indexAbout__itemImageBack"></div>
                  <div className="indexAbout__itemImage">
                    <LazyImage
                      src={require(`../../img/${item.image}`).default.src}
                      className="indexAbout__itemImageInner"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    startPositionCursor: state.startPositionCursor,
  };
}

export default connect(mapStateToProps)(About);
