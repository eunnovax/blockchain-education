const router = require('express').Router();
// import Consensus from '../models/broadcast.model';
let Broadcast = require('../models/broadcast.model');

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
      console.log('chain so far', chain);
    });
    // const blockNumber = req.body.chain[0].blockNumber;
    // const data = req.body.chain[0].data;
    // const nonce = req.body.chain[0].nonce;
    // const previousBlockHash = req.body.chain[0].previousBlockHash;
    // const timestamp = req.body.chain[0].timestamp;
    // const hash = req.body.chain[0].hash;
    
    const newChain = new Broadcast({
      title,
      nodes,
      chainId,
      chain
      // chain: [{
      //   blockNumber: blockNumber,
      //   data:data,
      //   nonce: nonce,
      //   previousBlockHash: previousBlockHash,
      //   timestamp: timestamp,
      //   hash: hash
      // }]
    });
    //consensus algorithm
    newChain
    .save()
    .then(() => res.json('Network updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;