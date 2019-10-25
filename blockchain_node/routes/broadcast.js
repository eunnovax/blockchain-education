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
      let chainStatus = false;
      //block and its data is extracted 
      if (chain.length <= 1) {
        console.log('blockchain cannot be updated!')
      } else if (chain.length > 1 && blockchain.chain.length >= chain.length) {
        console.log('blockchain is shorter than consensus chain')
      } else if (chain.length > 1 && blockchain.chain.length < chain.length) {
          for (let i=0; i<chain.length; i++) {
            if (i === chain.length - 1) {
              //extract block
              const block = req.body.chain[chain.length-1-i];
              const blockNumber = block.blockNumber;
              const data = block.data;
              const nonce = block.nonce;
              const previousBlockHash = block.previousBlockHash;
              const timestamp = block.timestamp;
              const hash = block.hash;
              const blckTxt = blockNumber + data + nonce + previousBlockHash + timestamp;
              const blockHash = SHA256(blckTxt).toString();
              const regex = /^(0{4})/;
              if (blockHash === hash && regex.test(hash) === true) {
              console.log('block is valid');
              chainStatus = true;
              break;
              } else {
                chainStatus = false;
                break;
              }
            }
            //extract block
            const block = req.body.chain[chain.length-1-i];
            const blockNumber = block.blockNumber;
            const data = block.data;
            const nonce = block.nonce;
            const previousBlockHash = block.previousBlockHash;
            const timestamp = block.timestamp;
            const hash = block.hash;
            // extract previous block
            const prevBlock = req.body.chain[chain.length-2-i];
            const prevBlockNumber = prevBlock.blockNumber;
            const prevData = prevBlock.data;
            const prevNonce = prevBlock.nonce;
            const prevPreviousBlockHash = prevBlock.previousBlockHash;
            const prevTimestamp = prevBlock.timestamp;
            const prevHash = prevBlock.hash;
            //SHA256 of blocks
            const prevBlockTxt = prevBlockNumber + prevData + prevNonce + prevPreviousBlockHash + prevTimestamp;
            const prevBlockHash = SHA256(prevBlockTxt).toString();
            const blckTxt = blockNumber + data + nonce + previousBlockHash + timestamp;
            const blockHash = SHA256(blckTxt).toString();
            //block is verified
            const regex = /^(0{4})/;
            if ( prevBlockHash === previousBlockHash && blockHash === hash && regex.test(hash) === true) {
            console.log('block is valid');
            chainStatus = true;
            } else {
              chainStatus = false;
              break;
            }
          }
          if ( chainStatus ) {
            console.log('blockchain is valid');
            blockchain.chain = chain;  
            blockchain
              .save()
              .then(() => res.json("Blockchain updated!"))
              .catch(err => res.status(400).json("Error: " + err));

          } else {
            console.log('blockchain is not valid')
          }
        }
      // const block = req.body.chain[chain.length-1];
      // const blockNumber = block.blockNumber;
      // const data = block.data;
      // const nonce = block.nonce;
      // const previousBlockHash = block.previousBlockHash;
      // const timestamp = block.timestamp;
      // const hash = block.hash;

      // const prevBlock = req.body.chain[chain.length-2];
      // let prevBlockNumber;let prevData;let prevNonce;let prevPreviousBlockHash;let prevTimestamp;let prevHash;
      // if (prevBlock) {
      // prevBlockNumber = prevBlock.blockNumber;
      // prevData = prevBlock.data;
      // prevNonce = prevBlock.nonce;
      // prevPreviousBlockHash = prevBlock.previousBlockHash;
      // prevTimestamp = prevBlock.timestamp;
      // prevHash = prevBlock.hash;
      // };

      // //SHA256 of block
      // const prevBlockTxt = prevBlockNumber + prevData + prevNonce + prevPreviousBlockHash + prevTimestamp;
      // const prevBlockHash = SHA256(prevBlockTxt).toString();
      // const blckTxt = blockNumber + data + nonce + previousBlockHash + timestamp;
      // const blockHash = SHA256(blckTxt).toString();
      // //block is verified
      // const regex = /^(0{4})/;
      // console.log('mined', regex.test(hash));
      //     // if (prevBlockHash === previousBlockHash && blockHash === hash && regex.test(hash) === true) {
      //     //   console.log('block is valid');
      //     if (blockchain.chain.length < chain.length) {  
      //       blockchain.chain = chain;  
      //       blockchain
      //         .save()
      //         .then(() => res.json("Blockchain updated!"))
      //         .catch(err => res.status(400).json("Error: " + err));
      //      }

    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;