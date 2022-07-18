import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/case/Order";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  order = {
    title: "ИИ",
  };

  render() {
    const { services } = this.props;

    return <Order model={this.order} services={services} />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(View);
