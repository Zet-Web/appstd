import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "./index/Header.jsx";
import Stats from "./index/Stats.jsx";
import About from "./index/About.jsx";
import Services from "./index/Services.jsx";
import Clients from "./index/Clients.jsx";
import Contacts from "./index/Contacts.jsx";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    axios.get(`https://api.appsstudio.ru/v1/index`).then((res) => {
      const { seo } = res.data;

      this.setState((state) => {
        const newState = { ...state };

        newState.seo = seo;
        newState.info = res.data;

        return newState;
      });
    });
  }

  staticSeo = {
    seo_title:
      "Создаем Дизайн & Разрабатываем Мобильные приложения. Искусственный Интеллект. Маркетплейсы. Онлайн-магазины | APPs Studio",
    seo_description:
      "➤ 60+ проектов. UX/UI. iOS. Android. Back-end. 9 лет на рынке. 30 человек команда. Работаем по fix price. Искусственный Интеллект. Маркетплейсы. Онлайн-магазины. Студия разработки мобильных приложений «APPs Studio». Тех поддержка 12 месяцев",
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { info } = this.state;
    const seo = this.state.seo || this.staticSeo;

    return (
      <>
        {seo && (
          <Head>
            <title>{seo.seo_title}</title>
            <meta name="description" content={seo.seo_description} />
          </Head>
        )}
        <div className="body__section">
          <Header />
        </div>
        <div className="body__section">
          <Stats info={info} />
        </div>
        <div className="body__section">
          <About />
        </div>
        <div className="body__section">
          <Services />
        </div>
        <div className="body__section">
          <Clients />
        </div>
        <div className="body__section">
          <Contacts />
        </div>
      </>
    );
  }
}

export default Index;
