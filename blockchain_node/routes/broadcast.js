const router = require('express').Router();
let Broadcast = require('../models/broadcast.model');
const SHA256 = require('crypto-js/sha256');

router.route('/').get((req, res) => {
    Broadcast.find()
    .then(blocks => res.json(blocks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get((req, res) => {
  Broadcast.findById(req.params.id)
    .then(block => res.json(block))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route('/add').post((req, res) => {
  validBlock = (block) => {
    // let regex = /^(0{4})/;
    // regex.test(block.hash);
    //consensus algorithm
    // broadcast the last block of a particular chain
    // if (
    // 1. sha256(prevBlock) === block.prevHash
    // 2. sha256(block) === block.hash
    // 3. '0000' === regex.test(block.hash))
    // { add the block to the chain }
    // else if (1. sha256(prevPrevBlock) === block.prevHash; 2. && 3.)
    // {add new chain as fork}
  }
    const title = req.body.title;
    const nodes = req.body.nodes;
    const chainId = req.body.chainId;
    let chain = [];
    req.body.chain.map(block => {
      const blockNumber = block.blockNumber;
      const data = block.data;
      const nonce = block.nonce;
      const previousBlockHash = block.previousBlockHash;
      const timestamp = block.timestamp;
      const hash = block.hash;
      let newBlock = {
          blockNumber: blockNumber,
          data:data,
          nonce: nonce,
          previousBlockHash: previousBlockHash,
          timestamp: timestamp,
          hash: hash
        };
      chain = [...chain, newBlock];  
      // console.log('chain so far', chain);
    });
    
    const newChain = new Broadcast({
      title,
      nodes,
      chainId,
      chain
    });
    newChain
    .save()
    .then(() => res.json('Network updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route("/update/:id").post((req, res) => {
  
  Broadcast.findById(req.params.id)
    .then(blockchain => {
      blockchain.title = req.body.title;
      blockchain.nodes = req.body.nodes;
      blockchain.chainId = req.body.chainId;
      let chain = [...req.body.chain];
      // req.body.chain.map(block => {
      //   const blockNumber = block.blockNumber;
      //   const data = block.data;
      //   const nonce = block.nonce;
      //   const previousBlockHash = block.previousBlockHash;
      //   const timestamp = block.timestamp;
      //   const hash = block.hash;
      //   let newBlock = {
      //       blockNumber: blockNumber,
      //       data:data,
      //       nonce: nonce,
      //       previousBlockHash: previousBlockHash,
      //       timestamp: timestamp,
      //       hash: hash
      //     };
      //   chain = [...chain, newBlock];  
      //   // console.log('chain so far', chain);
      // });
      const block = req.body.chain[chain.length-1];
      // console.log('block', block);
      const blockNumber = block.blockNumber;
      const data = block.data;
      const nonce = block.nonce;
      const previousBlockHash = block.previousBlockHash;
      const timestamp = block.timestamp;
      const hash = block.hash;
      const prevBlock = req.body.chain[chain.length-2];
      let prevBlockNumber;let prevData;let prevNonce;let prevPreviousBlockHash;let prevTimestamp;let prevHash;
      if (prevBlock) {
      prevBlockNumber = prevBlock.blockNumber;
      prevData = prevBlock.data;
      prevNonce = prevBlock.nonce;
      prevPreviousBlockHash = prevBlock.previousBlockHash;
      prevTimestamp = prevBlock.timestamp;
      prevHash = prevBlock.hash;
      };
      console.log('prevBlock', prevBlock);
      console.log('prevHash', prevHash);
      const prevBlockTxt = prevBlockNumber + prevData + prevNonce + prevPreviousBlockHash + prevTimestamp;
      const prevBlockHash = SHA256(prevBlockTxt).toString();
      const blckTxt = blockNumber + data + nonce + previousBlockHash + timestamp;
      const blockHash = SHA256(blckTxt).toString();
     
      const regex = /^(0{4})/;
      console.log('prevBlockHash', prevBlockHash);
      console.log('previousBlockHash', previousBlockHash);
      console.log('blockHash', blockHash);
      console.log('hash', hash);
      console.log('mined', regex.test(hash));
          // if (prevBlockHash === previousBlockHash && blockHash === hash && regex.test(hash) === true) {
          //   console.log('block is valid');
          if (blockchain.chain.length < chain.length) {  
            blockchain.chain = chain;  
            blockchain
              .save()
              .then(() => res.json("Blockchain updated!"))
              .catch(err => res.status(400).json("Error: " + err));
           }

    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;