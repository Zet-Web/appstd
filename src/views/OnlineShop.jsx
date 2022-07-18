import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "./onlineShop/Header.jsx";
import Cases from "./onlineShop/Cases.jsx";
import Services from "./onlineShop/Services.jsx";
import Projects from "./onlineShop/Projects.jsx";
import Stages from "./onlineShop/Stages.jsx";
import Order from "./onlineShop/Order.jsx";
import Contacts from "./index/Contacts.jsx";
import getCaseInfo from "../functions/getCaseInfo.js";

class OnlineShop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    getCaseInfo("online_store").then((info) => {
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
      "Разработка лучшего онлайн-магазина на iOS и Android | APPs Studio",
    seo_description: "Для продажи товаров или услуг с программой лояльности",
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { services, headers, elements } = this.state;
    const seo = this.state.seo || this.staticSeo;

    console.log(seo);

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

export default OnlineShop;
