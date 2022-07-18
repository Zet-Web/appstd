import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";

import Header from "./portfolio/Header.jsx";
import Contacts from "./index/Contacts.jsx";
import Clients from "./index/Clients.jsx";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    axios.get(`https://api.appsstudio.ru/v1/portfolio/`).then((res) => {
      const { seo } = res.data;

      this.setState((state) => {
        const newState = { ...state };

        newState.seo = seo;

        return newState;
      });
    });
  }

  staticSeo = {
    seo_title: "Портфолио | APPs Studio",
    seo_description:
      "Выполнили более 60 проектов за 9 лет. Маркетплейсы, Онлайн-магазины и проекты с Искусственным Интелектом - наш основной профиль, делаем их реально круто",
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
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
          <Clients type="clients" />
        </div>
        <div className="body__section">
          <Contacts />
        </div>
      </>
    );
  }
}

export default Portfolio;
