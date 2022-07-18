import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "./intelligence/Header.jsx";
import Cases from "./intelligence/Cases.jsx";
import Services from "./intelligence/Services.jsx";
import Projects from "./intelligence/Projects.jsx";
import Stages from "./intelligence/Stages.jsx";
import Order from "./intelligence/Order.jsx";
import Contacts from "./index/Contacts.jsx";
import getCaseInfo from "../functions/getCaseInfo.js";

class Intelligence extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    getCaseInfo("ai").then((info) => {
      this.setState((state) => {
        const newState = { ...state };

        Object.keys(info).forEach((key) => {
          newState[key] = info[key];
        });

        return newState;
      });
    });
  }

  staticSeo = {
    seo_title:
      "Разработка системы с искусственным интеллектом (ИИ) | APPs Studio",
    seo_description:
      "Эффективное решение задачи с помощью моделей машинного обучения. Интеграция модуля ИИ в бизнес. Реализация всей системы с искусственным интеллектом под ключ.",
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { services, headers, elements } = this.state;
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
          <Header headers={headers} />
        </div>
        <div className="body__section">
          <Cases elements={elements} />
        </div>
        <div className="body__section">
          <Services />
        </div>
        <div className="body__section">
          <Projects />
        </div>
        <div className="body__section">
          <Stages />
        </div>
        <div className="body__section">
          <Order services={services} />
        </div>
        <div className="body__section">
          <Contacts />
        </div>
      </>
    );
  }
}

export default Intelligence;
