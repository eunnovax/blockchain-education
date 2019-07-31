"use strict";

(async () => {
  function Consensus() {
    this.difficulty = 5;
    this.difficultyRegex = new RegExp("^0{" + this.difficulty + "}");
  }

  Consensus.prototype.mineBlock = function(
    blockNumber,
    data,
    previousBlockHash
  ) {
    let block = new Block(blockNumber, data, 0, previousBlockHash); //start the nonce at 0
    //while we have not got the correct number of leadings 0's (difficulty * 0) in our blockHash, keep incrementing the blocks nonce
    while (!this.validHash(block.hash)) {
      block.incrementNonce();
    }
    console.log("Mined new block: " + block.toString());
    return block;
  };

  Consensus.prototype.validHash = function(hash) {
    return this.difficultyRegex.test(hash);
  };

  module.exports = Consensus;
})();
