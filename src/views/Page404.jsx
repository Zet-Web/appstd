import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "./404page/Header.jsx";

class Page404 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInfo() {
    axios.get(`https://api.appsstudio.ru/v1/404`).then((res) => {
      const { seo } = res.data;

      this.setState((state) => {
        const newState = { ...state };

        newState.seo = seo;

        return newState;
      });
    });
  }

  staticSeo = {
    seo_title: "Oops..! Страница не найдена | APPs Studio",
    seo_description:
      "Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена, или был введен неверный url в адресной строке",
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
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

        <div className="body__section _404Page">
          <Header />
        </div>
      </>
    );
  }
}

export default Page404;
