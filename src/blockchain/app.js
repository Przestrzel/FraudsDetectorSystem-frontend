App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Auctions.json", function(auction) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Auctions = TruffleContract(auction);
      // Connect provider to interact with contract
      App.contracts.Auctions.setProvider(App.web3Provider);

   //   App.listenForEvents();

      return App.render();
    });
  },
  
  
  // Listen for events emitted from the contract
  /*listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },*/

  render: function() {
    var auctionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });


    App.contracts.Auctions.deployed().then(function(instance) {
      auctionInstance = instance;
      return auctionInstance.advertisers(App.account);
    }).then(function(advertisers) {
      var candidatesResults = $("#auctionResults");
      candidatesResults.empty();
      var candidateTemplate = "<tr> <th>"+ advertisers[0] +"</th></tr>"
      candidatesResults.append(candidateTemplate);
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
    },

    MoreMoney: function() {
      web2 = new Web3.providers.HttpProvider('http://localhost:8545');
      web4 = new Web3(web2);
        web4.eth.getAccounts(function(error, result) {
        web4.eth.sendTransaction(
            {from:web4.eth.accounts[0],
            to:App.account,
            value:  web4.toWei(10.0, "ether"), 
                }, function(err, transactionHash) {
          if (!err)
            console.log(transactionHash + " success"); 
            $("#signed").html("Doładowano");
        });
    });

    },
      
  registerAdvertiser: function() {
  var name = $('#fname').val();
  var city = $('#city').val();
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.registerAdvertiser(name, city, { from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    $("#error").html("Transakcja nie powiodła się");
    if(err.message.includes("Name has to be provided"))
    $("#message").html("Proszę podać nazwę");
    else if(err.message.includes("City has to be provided"))
    $("#message").html("Proszę podać miasto");
    else if (err.message.includes("Advertiser with this account is already registered"))
    $("#message").html("Nie można utworzyć dwóch kont z tym samym adresem");
});
},

registerOfferent: function() {
  var name = $('#offname').val();
  var NIP = $('#NIP').val();
  var owner = $('#owner').val();
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.registerOfferent(name, NIP, owner ,{ from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    $("#error").html("Transakcja nie powiodła się");
    if(err.message.includes("Name has to be provided"))
    $("#message").html("Proszę podać nazwę");
    else if(err.message.includes("Owner has to be provided"))
    $("#message").html("Proszę podać właściciela");
    else if (err.message.includes("NIP has to be 10 digits long"))
    $("#message").html("NIP musi mieć 10 cyfr długości");
    else if (err.message.includes("Offerent with this account is already registered"))
    $("#message").html("Nie można utworzyć dwóch kont z tym samym adresem");
});
},

createAuction: function() {
  var name = $('#auctionname').val();
  var sdate =  Math.floor(document.getElementById('sdate').valueAsNumber / 1000); //value in seconds
  var edate =  Math.floor(document.getElementById('edate').valueAsNumber / 1000); //value in seconds
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.createAuction(name, sdate, edate ,{ from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    $("#error").html("Transakcja nie powiodła się");
    if (err.message.includes("You are not registered as an advertiser"))
    $("#message").html("Aby dodać przetarg należy być zarejestrowanym")
    else if(err.message.includes("Name has to be provided"))
    $("#message").html("Proszę podać nazwę");
    else if(err.message.includes("End date must be later than start date"))
    $("#message").html("Data zamknięcia musi być późniejsza niż data otwarcia");
});
},

makeOffer: function() {
  var name = $('#a_o_name').val();
  var price = document.getElementById('price').valueAsNumber * 100;
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.makeOffer(name, price, { from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    $("#error").html("Transakcja nie powiodła się");
    if (err.message.includes("You are not registered as an offerent"))
    $("#message").html("Aby dodać przetarg należy być zarejestrowanym")
    else if(err.message.includes("There is no auction with this name"))
    $("#message").html("Nie ma przetargu o podanej nazwie");
    else if(err.message.includes("There is no auction"))
    $("#message").html("Żaden przetarg nie został zarejestrowany");
});
},

setAuctionStatus: function() {
  var name = $('#s_name').val();
  var status = $('#status').val();
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.setAuctionStatus(name, status, { from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    $("#error").html("Transakcja nie powiodła się");
    if (err.message.includes("You are not registered as an advertiser"))
    $("#message").html("Aby dokonać zmiany w przetargu należy być zarejestrowanym")
    else if (err.message.includes("You are allowed to change only your auctions"))
    $("#message").html("Można dokonywać zmiany jedynie swojego przetargu")
    else if(err.message.includes("There is no auction with this name"))
    $("#message").html("Nie ma przetargu o podanej nazwie");
    else if(err.message.includes("There is no auction"))
    $("#message").html("Żaden przetarg nie został zarejestrowany");
});
},

setAuctionWinner: function() {
  var name = $('#w_name').val();
  var winner = $('#winner').val();
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.setAuctionWinner(name, winner, { from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    $("#error").html("Transakcja nie powiodła się");
    if (err.message.includes("You are not registered as an advertiser"))
    $("#message").html("Aby dokonać zmiany w przetargu należy być zarejestrowanym")
    else if (err.message.includes("You are allowed to change only your auctions"))
    $("#message").html("Można dokonywać zmiany jedynie swojego przetargu")
    else if(err.message.includes("There is no auction with this name"))
    $("#message").html("Nie ma przetargu o podanej nazwie");
    else if(err.message.includes("There is no auction"))
    $("#message").html("Żaden przetarg nie został zarejestrowany");
    else if (err.message.includes("Auction has no offer with this offerent"))
    $("#message").html("Przetarg nie posiada oferty tego oferenta")
});
},
getAuctionWinner: function() {
  var name = $('#g_w_name').val();
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.getAuctionWinner(name,{ from: App.account });
  }).then(function(result) {
    return auctionInstance.offerents(result);
  }).then(function(off) {
    $('#result').html(off[0]);
  })
  .catch(function(err) {
    console.log(err)
    $("#error_get").html("Transakcja nie powiodła się");
    if(err.data.message.includes("There is no auction with this name"))
    $("#message_get").html("Nie ma przetargu o podanej nazwie");
    else if(err.data.message.includes("This auction has no winner"))
    $("#message_get").html("Ten przetarg nie został jeszcze rozstrzygnięty")
    else if(err.data.message.includes("There is no auction"))
    $("#message_get").html("Żaden przetarg nie został zarejestrowany");
});
},
getAuctionStatus: function() {
  var name = $('#g_s_name').val();
  App.contracts.Auctions.deployed().then(function(instance) {
    auctionInstance = instance;
    return auctionInstance.getAuctionStatus(name,{ from: App.account });
  }).then(function(result) {
   
    $('#result').html(result);
  }).catch(function(err) {
    console.log(err);
    $("#error_get").html("Transakcja nie powiodła się");
    if(err.data.message.includes("There is no auction with this name"))
    $("#message_get").html("Nie ma przetargu o podanej nazwie");
    else if(err.data.message.includes("There is no auction"))
    $("#message_get").html("Żaden przetarg nie został zarejestrowany");
});
},



  /*castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }*/
  /* // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },*/

};



$(function() {
  $(window).load(function() {
    App.init();
  });
});
