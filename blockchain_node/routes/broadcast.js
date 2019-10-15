const router = require('express').Router();
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
      // console.log('chain so far', chain);
    });
    
    const newChain = new Broadcast({
      title,
      nodes,
      chainId,
      chain
    });
    //consensus algorithm
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
      blockchain.chain = chain;  
 
      blockchain
        .save()
        .then(() => res.json("Blockchain updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;