import React, { Component } from "react";
import { View } from "react-native";
export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartTime: [],
      chartValue: [],
    };
  }

  async componentDidMount() {
    console.log("this.props :>> ", this.props.coin["id"]);
    await fetch(
      "https://api.coingecko.com/api/v3/coins/" +
        this.props.coin["id"] +
        "/market_chart?vs_currency=try&days=3"
    )
      .then((response) => response.json())
      .then((response) => {
        var times = [];
        var values = [];

        response.prices.forEach((element) => {
          times.push(element[0]);
          values.push(element[1]);
        });
        this.setState({ chartTime: times, chartValue: values });
      });
  }

  render() {
    return (
      //TODO: Pages goes here
      <View></View>
    );
  }
}
