import React, { Component } from "react";
import axios from "axios";
import data from "./Data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chains: [],
      network: [],
      modalOpen: false
    };
  }

  // CONSTRUCTOR METHODS
  setNetwork = network => {
    let tempNetwork = [];
    network.forEach(blockchain => {
      const singleBlockchain = [...blockchain];
      tempNetwork = [...tempNetwork, singleBlockchain];
    });
    this.setState(() => {
      return { network: tempNetwork };
    });
  };
  // END OF CONSTRUCTOR METHODS
  componentDidMount() {
    return console.log("component mounted");
  }
  //BODY METHODS
  //END OF BODY METHODS

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state
          // bodyMethod: this.bodyMethod
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
