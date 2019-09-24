import React, { Component } from "react";
import axios from "axios";
import { network } from "./Data";
import SHA256 from 'crypto-js/sha256';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  blockText = (block, chain) => {
    const {blockNumber, data, nonce, previousBlockHash, timestamp} = this.state.network[chain].chain[block];
    let blckTxt = blockNumber + data + nonce + previousBlockHash + timestamp;
    return blckTxt;
  }
  sha256 = (block, chain) => {
    // calculate a SHA256 hash of the contents of the block
    return SHA256(this.blockText(block, chain));
  }
  updateHash = (block, chain) => {
    return this.setState({hash: this.sha256(block, chain)});
  }
  updateChain = (block, chain) => {
    for (let i=block; i < this.state.network[chain].chain.length; i++ ) {
      if (i>1) {
        this.setState({prevHash: this.state.network[chain].chain[i-1].hash});
      }
      this.updateHash(i, chain);
    }
  }
  mine = (block,chain, isChain) => {
    const {nonce, hash} = this.state.chain[block];
    const {difficulty} = this.state.difficulty; const {pattern} = this.state.pattern;
    for (let x=0; x<this.state.maxNonce; x++) {
      nonce = x;
      hash = this.sha256(block, chain);
      if (hash.substring(0,difficulty) === pattern) {
        this.updateChain(block, chain);
      }
    }
  }
  
  //END OF BODY METHODS

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          blockNumber: this.blockText,
          sha256: this.sha256,
          updateHash: this.updateHash,
          updateChain: this.updateChain,
          mine: this.mine
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
