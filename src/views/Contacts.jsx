import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "./contacts/Header.jsx";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    axios.get(`https://api.appsstudio.ru/v1/contacts`).then((res) => {
      const { seo } = res.data;

      this.setState((state) => {
        const newState = { ...state };

        newState.seo = seo;

        return newState;
      });
    });
  }

  staticSeo = {
    seo_title: "Контакты | APPs Studio",
    seo_description:
      "Ответим в течении рабочего дня. Можем сразу дать ориентировочную оценку, либо конкретизировать ее после детального обсуждения",
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
      </>
    );
  }
}

export default Contacts;
