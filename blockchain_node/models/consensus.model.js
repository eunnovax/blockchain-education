const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consensusSchema = new Schema(
    {
        
            title: "1st Blockchain",
            nodes: 0,
            chainId: 1,
            chain: [
              {
                blockNumber: 1,
                data: "hello world",
                nonce: 1234,
                previousBlockHash: "98765432fedcba",
                timestamp: 1000,
                hash: "123456789abcdef"
              }
            ]
          
    },
    {
        timestamps: true
    }
);