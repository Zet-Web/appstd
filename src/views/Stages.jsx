import React, { Component } from "react";
import Head from "next/head";

import Header from "./stages/Header.jsx";
import Items from "./stages/Items.jsx";
import Contacts from "./index/Contacts.jsx";
import StagesInfo from "../components/stages/StagesInfo.jsx";
import { windowFix, windowFixRemove } from "../functions/windowFix.js";
import axios from "axios";

class OnlineShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateInfo: -1,
      dataKey: 3,
      seo: null,
    };

    this.handlerInfo = this.handlerInfo.bind(this);
  }

  handlerInfo(action, data = null) {
    switch (action) {
      case "show":
        windowFix();
        this.setState((state) => {
          const newState = { ...state };

          newState.stateInfo = 0;
          newState.dataKey = data;

          return newState;
        });

        setTimeout(() => {
          this.setState((state) => {
            const newState = { ...state };

            newState.stateInfo = 1;

            return newState;
          });
        }, 30);
        break;
      case "hide":
        windowFixRemove();
        this.setState((state) => {
          const newState = { ...state };

          newState.stateInfo = 0;

          return newState;
        });

        setTimeout(() => {
          this.setState((state) => {
            const newState = { ...state };

            newState.stateInfo = -1;
            newState.dataKey = null;

            return newState;
          });
        }, 300);
        break;
      default:
        if (this.state.stateInfo === -1) {
          this.handlerInfo("show");
        } else {
          this.handlerInfo("hide");
        }
        break;
    }
  }

  getStages() {
    return new Promise((resolve) => {
      axios.get(`https://api.appsstudio.ru/v1/stages`).then((res) => {
        const { stages, seo } = res.data;

        this.setState(
          (state) => {
            const newState = { ...state };

            newState.stages = stages;
            newState.seo = seo;

            return newState;
          },
          () => {
            resolve();
          }
        );
      });
    });
  }

  staticSeo = {
    seo_title: "Этапы реализации мобильного приложения | APPs Studio",
    seo_description:
      "Разработка мобильного приложения под ключ состоит из 5 основных этапов реализации. Каждый из которых, включает свой список работ, кол-во которых, зависит от необходимых функций и возможностей, логики и сторонних интеграций у предстоящего проекта. Ниже подробно о каждом из них",
  };

  componentDidMount() {
    this.getStages();
  }

  render() {
    const { stateInfo, dataKey, stages } = this.state;
    const seo = this.state.seo || this.staticSeo;

    return (
      <>
        {seo && (
          <Head>
            <title>{seo.seo_title}</title>
            <meta name="description" content={seo.seo_description} />
          </Head>
        )}

        {[0, 1].indexOf(stateInfo) !== -1 && (
          <div className={`body__stagesInfo ${stateInfo === 1 ? "_show" : ""}`}>
            <StagesInfo handlerInfo={this.handlerInfo} dataKey={dataKey} />
          </div>
        )}
        <div className="body__section">
          <Header />
        </div>
        {stages && (
          <div className="body__section">
            <Items handlerInfo={this.handlerInfo} stages={stages} />
          </div>
        )}
        <div className="body__section">
          <Contacts />
        </div>
      </>
    );
  }
}

export default OnlineShop;
