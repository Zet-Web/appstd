import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";

import Header from "./about/Header.jsx";
import History from "./about/History.jsx";
import Clients from "./index/Clients.jsx";
import Contacts from "./index/Contacts.jsx";

class OnlineShop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    axios.get(`https://api.appsstudio.ru/v1/about`).then((res) => {
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
    seo_title: "О студии | APPs Studio",
    seo_description:
      "Студия APPs Studio. Гарантия результата. Гарантия качества. Гибкая оплата. Позиционирование. Миссия. История. Эволюция",
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
          <Header info={info} />
        </div>
        <div className="body__section">
          <History info={info} />
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

export default OnlineShop;
