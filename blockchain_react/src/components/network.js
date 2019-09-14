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
                    <div className="row">
                      <Blockchain
                        key={value.network.indexOf(blockchain) + 1}
                        blockchain={blockchain}
                      />
                      ;
                    </div>
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
