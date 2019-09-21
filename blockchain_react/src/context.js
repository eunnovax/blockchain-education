import React, { Component } from "react";
import axios from "axios";
import { network } from "./Data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chain: [],
      network: [],
      modalOpen: false,
      difficulty: 4,
      maxNonce: 500000,
      pattern: '',
      hash: ''
    };
  }

  // CONSTRUCTOR METHODS
  setNetwork = network => {
    let tempNetwork = [];
    network.forEach(blockchain => {
      const singleBlockchain = { ...blockchain };
      tempNetwork = [...tempNetwork, singleBlockchain];
    });
    
    this.setState(() => {
      return { network: tempNetwork };
    });
  };
  setPattern = difficulty => {
    let pattern = '';
    for (let x = 0; x < difficulty; x++) {
      pattern += '0';
    }
    this.setState(() => {
      return { pattern: pattern };
    });
  };
  componentDidMount() {
    this.setNetwork(network);
    this.setPattern(this.state.difficulty);
    return console.log("component mounted");
  }
  // END OF CONSTRUCTOR METHODS

  //BODY METHODS
  sha256 = (blockNumber, chainId) => {
    // calculate a SHA256 hash of the contents of the block
    return CryptoJS.SHA256(getText(blockNumber, chainId));
  }
  updateState = (blockNumber, chainId, stateEl) => {
    if (this.state.hash.substring(0,difficulty) === pattern) {
      stateEl.classList.remove('well-error').add('well-success');
    } else {
      stateEl.classList.remove('well-success').add('well-error');
    }
  }
  updateHash = (blockNumber, chainId) => {
    this.setState({hash: this.sha256(blockNumber, chainId)});
    this.updateState(blockNumber, chainId, stateEl);
  }
  updateChain = (blockNumber, chainId) => {
    for (let x=0; x < network[chainId].chain.length; x++ ) {
      if (x>1) {
        this.setState({prevHash: network[chainId].chain[x-1].hash});
      }
      this.updateHash(x, chainId);
    }
  }
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
