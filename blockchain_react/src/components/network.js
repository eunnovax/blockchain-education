import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Blockchain } from "./Blockchain";

class Network extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductConsumer>
          {value => {
            return value.network.map(blockchain => {
              return <Blockchain />;
            });
          }}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}

export default Network;
