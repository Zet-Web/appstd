import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "./marketplace/Header.jsx";
import Cases from "./marketplace/Cases.jsx";
import Services from "./marketplace/Services.jsx";
import Projects from "./marketplace/Projects.jsx";
import Stages from "./marketplace/Stages.jsx";
import Order from "./marketplace/Order.jsx";
import Contacts from "./index/Contacts.jsx";
import getCaseInfo from "../functions/getCaseInfo.js";

class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    getCaseInfo("marketplace").then((info) => {
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
    seo_title: "Разработка крутого маркетплейса под ключ | APPs Studio",
    seo_description:
      "Площадка, где одни пользователи продают, другие покупают, а вы зарабатываете.",
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

export default Marketplace;
