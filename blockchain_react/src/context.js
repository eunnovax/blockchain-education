import React, { Component } from "react";
import axios from "axios";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chains: [],
      blockchain: [],
      modalOpen: false
    };
  }

  // CONSTRUCTOR METHODS
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
