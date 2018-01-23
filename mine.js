// Adapted from Iuri Matias' Embark framework
// https://github.com/iurimatias/embark-framework
// Modified by ryepdx to mine at regular intervals.
(function() {
  var main = function () {
    if (!loadScript("config.js")) {
      console.log("== config.js not found");
    }

    if (typeof(config) === "undefined") {
      config = {};
      console.log("== config is undefined, proceeding with defaults");
    }

    defaults = {
      interval_ms: 15000,
      mine_pending_txns: true,
      mine_periodically: false,
      mine_normally: false,
      threads: 1
    }

    for (key in defaults) {
      if (config[key] === undefined) {
        config[key] = defaults[key];
      }
    }

    var miner_obj = miner;

    if (config.mine_normally) {
        miner_obj.start(config.threads);
        return;
    }
    miner_obj.stop();

    if (config.mine_periodically) start_periodic_mining(config, miner_obj);
    if (config.mine_pending_txns) start_transaction_mining(config, miner_obj);
  };

  var pendingTransactions = function() {
    if (web3.eth.pendingTransactions === undefined || web3.eth.pendingTransactions === null) {
      return txpool.status.pending || txpool.status.queued;
    }
    else if (typeof web3.eth.pendingTransactions === "function")  {
      return web3.eth.pendingTransactions().length > 0;
    }
    else {
      return web3.eth.pendingTransactions.length > 0 || web3.eth.getBlock('pending').transactions.length > 0;
    }
  };

  var start_periodic_mining = function (config, miner_obj) {
    var last_mined_ms = Date.now();
    var timeout_set = false;

    miner_obj.start(config.threads);
    web3.eth.filter("latest").watch(function () {
      if ((config.mine_pending_txns && pendingTransactions()) || timeout_set) {
        return;
      }

      timeout_set = true;

      var now = Date.now();
      var ms_since_block = now - last_mined_ms;
      last_mined_ms = now;

      var next_block_in_ms;

      if (ms_since_block > config.interval_ms) {
        next_block_in_ms = 0;
      } else {
        next_block_in_ms = (config.interval_ms - ms_since_block);
      }

      miner_obj.stop();
      console.log("== Looking for next block in " + next_block_in_ms + "ms");

      setTimeout(function () {
        console.log("== Looking for next block");
        timeout_set = false;
        miner_obj.start(config.threads);
      }, next_block_in_ms);
    });
  };
var transhash;
  var start_transaction_mining = function (config, miner_obj) {
    
    web3.eth.filter("pending").watch(function () {
      if (miner_obj.hashrate > 0) return;

      console.log("== Pending transactions! Looking for next block...");
      var p=web3.eth.getTransaction(web3.eth.getBlock("pending").transactions[0]);
      transhash=p["hash"];
      console.log(JSON.stringify(transhash));
      console.log(JSON.stringify(p,null,'\t'));
      miner_obj.start(config.threads);
    });

    if (config.mine_periodically) return;

    web3.eth.filter("latest").watch(function () {
      if (!pendingTransactions()) {
        //console.log("==mined thash");
        
        
        //var thash=JSON.stringify(transhash);
       // console.log("mined thash");
        var minedtransact=web3.eth.getTransaction(transhash);
        console.log("transaction mined Successfully");
        console.log(JSON.stringify(minedtransact,null,'\t'));
        miner_obj.stop();
        console.log("== No transactions left. Stopping miner...");
      }

    });
  };

  main();
})();
