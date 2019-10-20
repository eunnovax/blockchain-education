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
      hash: '',
      networkDB: [],
      status: false
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
    this.setPattern(this.state.difficulty);
    console.log("component mounted");
    axios
    .get('http://localhost:5000/broadcast/')
    .then(response => {
      console.log('blocks', response.data);
      this.setState({networkDB: response.data});
      this.setNetwork(response.data);
    })
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
  updateHash = (block, chain, network) => {
    let tempNetwork = [...network];
    tempNetwork[chain].chain[block].hash = this.sha256(block,chain, tempNetwork).toString();
    return tempNetwork;
  }
  updateChain = (block, chain) => {
    let tempNetwork = [...this.state.network];
    for (let i=block; i < this.state.network[chain].chain.length; i++ ) {
      if (i>0) {
        // console.log('tempNetwork', tempNetwork);
        tempNetwork[chain].chain[i].previousBlockHash = tempNetwork[chain].chain[i-1].hash;
        // this.setState({network: tempNetwork});
      }
      tempNetwork = this.updateHash(i, chain, tempNetwork);
    }
    this.setState({network: tempNetwork});
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
  changeNonce = (e, block, chain) => {
    let tempNetwork = [...this.state.network];
    tempNetwork[chain].chain[block].nonce = e.target.value;
    
    this.setState({
      network: tempNetwork
    }, () => {
      this.updateChain(block, chain)
      // console.log('nonce', this.state.network[chain].chain[block].nonce);
    });
  };
  changeData = (e, block, chain) => {
    let tempNetwork = [...this.state.network];
    tempNetwork[chain].chain[block].data = e.target.value;
    
    this.setState({
      network: tempNetwork
    }, () => {
      this.updateChain(block, chain)
      // console.log('data', this.state.network[chain].chain[block].data);
    });
  };
  addBlock = (block, chain) => {
    let tempNetwork = [...this.state.network];
    let newBlock = {};
    newBlock.blockNumber = block + 1;
    newBlock.data = 'new block';
    newBlock.nonce = 1111;
    newBlock.previousBlockHash = tempNetwork[chain-1].chain[block-1].hash;
    newBlock.timestamp = 1111;
    newBlock.hash = '0101abc';
    tempNetwork[chain-1].chain = [...tempNetwork[chain-1].chain, newBlock];
    this.setState({network: tempNetwork});
  };
  addChain = () => {
    let tempNetwork = [...this.state.network];
    let newChain = {};
    newChain.nodes = 0;
    newChain.title = 'New Blockchain';
    newChain.chainId = tempNetwork.length + 1;
    newChain.chain = [];

    let newBlock = {};
    newBlock.blockNumber = 1;
    newBlock.data = 'new block';
    newBlock.nonce = 1111;
    newBlock.previousBlockHash = '0';
    newBlock.timestamp = 1111;
    newBlock.hash = '0011afcde';
    
    newChain.chain = [...newChain.chain, newBlock];
    tempNetwork = [...tempNetwork, newChain];
    this.setState({network: tempNetwork});
  };
  consensus = (e, chain) => {
    // check if the blockchain is valid and mined
    e.preventDefault();
    const networkArray = [...this.state.network];
    console.log('netArray', networkArray);
    const blockchain = networkArray[chain];
    console.log('block added', blockchain);
    const Id = this.state.networkDB[chain]._id;
    if (Id) {
      axios
      .post('http://localhost:5000/broadcast/update/' + Id, blockchain)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      axios
      .post('http://localhost:5000/broadcast/add', blockchain)
      .then(res => {
      console.log(res.data);
      })
      .catch(error=> {
        console.log(error);
      });
    }
    
    // window.location = '/';
  };
  checkChain = (e, chain) => {
    let tempNetwork = [...this.state.network];
    let status = false;
    for (let i=0; i< tempNetwork[chain].chain.length; i++) {
      const hash = tempNetwork[chain].chain[i].hash;
      if (hash.substring(0,this.state.difficulty) === this.state.pattern) {
        status = true;
      } else {
        break;
      }
    }
    if (status) {
      this.setState({status: status});
    }
  };
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
          mine: this.mine,
          changeNonce: this.changeNonce,
          changeData: this.changeData,
          addBlock: this.addBlock,
          addChain: this.addChain,
          consensus: this.consensus
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
