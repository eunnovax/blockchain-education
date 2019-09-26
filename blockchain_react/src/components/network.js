import React, { Component } from "react";
import { ProductConsumer } from "../context";
import Blockchain from "./Blockchain";

class Network extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <ProductConsumer>
              {value => {
                return value.network.map(blockchain => {
                  return (
                      <Blockchain
                        key={value.network.indexOf(blockchain) + 1}
                        blockchain={blockchain}
                        chainID={value.network.indexOf(blockchain)+1}
                      />
                  );
                });
              }}
            </ProductConsumer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Network;
