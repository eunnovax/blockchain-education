import React, { Component } from "react";
import axios from "axios";
import { network } from "./Data";
import SHA256 from 'crypto-js/sha256';

const ProductContext = React.createContext();
let pattern = '';
const setPattern = function (diff ) {
 
  for (let x = 0; x < diff; x++) {
    pattern += '0';
  }
  console.log(pattern);
  return pattern;
  
};

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
  setPattern = (diff) => {
    let pattern = '';
    for (let x = 0; x < diff; x++) {
      pattern += '0';
    }
    this.setState({
    pattern: pattern 
  });
  };

  componentDidMount() {
    this.setNetwork(network);
    this.setPattern(this.state.difficulty);
    return console.log("component mounted");
  }
  // END OF CONSTRUCTOR METHODS

  //BODY METHODS
  blockText = (block, chain, network) => {
    const {blockNumber, data, nonce, previousBlockHash, timestamp} = network[chain].chain[block];
    let blckTxt = blockNumber + data + nonce + previousBlockHash + timestamp;
    // console.log('blockText', blckTxt);
    return blckTxt;
  }
  sha256 = (block, chain, network) => {
    // calculate a SHA256 hash of the contents of the block
    const hash = SHA256(this.blockText(block, chain, network));
    // console.log('hash', hash);
    return hash;
  }
  updateHash = (block, chain) => {
    let tempNetwork = [...this.state.network];
    tempNetwork[chain].chain[block].hash = this.sha256(block,chain, tempNetwork).toString();
    return this.setState({network: tempNetwork});
  }
  updateChain = (block, chain) => {
    for (let i=block; i < this.state.network[chain].chain.length; i++ ) {
      if (i>1) {
        let tempNetwork = [...this.state.network];
        // console.log('tempNetwork', tempNetwork);
        tempNetwork[chain].chain[i].previousBlockHash = tempNetwork[chain].chain[i-1].hash;
        this.setState({network: tempNetwork});
      }
      this.updateHash(i, chain);
    }
  }
  mine = (block,chain) => {
    // const {nonce, hash} = this.state.chain[block];
    for (let x=0; x<this.state.maxNonce; x++) {
      let tempNetwork = [...this.state.network];
      // console.log('tempNetwork', block, chain);
      tempNetwork[chain].chain[block].nonce = x;
      const hash = this.sha256(block, chain, tempNetwork).toString();
      // console.log('string hash', hash);
      // console.log('substring of hash', hash.substring(0,this.state.difficulty), 'pattern', this.state.pattern);
      if (hash.substring(0,this.state.difficulty) === this.state.pattern) {
        this.updateChain(block, chain);
        break;
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
