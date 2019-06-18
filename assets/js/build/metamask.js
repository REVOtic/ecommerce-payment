function monitorMetamask(){
  window.ethereum.on('accountsChanged', function (accounts) {
  
  });
  
  window.ethereum.on('networkChanged', function (netId) {
    
  });
}


function get_network() {
  return new Promise (function (resolve, reject) {
    web3.version.getNetwork((err, netId) => {      
      switch (netId) {
        case "1":
          resolve("Main");
          break;
        case "2":
          resolve("Morden");
          break;
        case "3":
          resolve("Ropsten");
          break;
        case "4":
          resolve("Rinkeby");
          break;
        case "42":
          resolve("Kovan");
          break;
        default:
          reject(false);
          break;
      }
    });
  });
}


async function get_wallet_address(){
  if (typeof window.ethereum !== 'undefined' && ethereum.isMetaMask){
    const accounts = await ethereum.enable();

    if(accounts[0]){
      var wallet_address = web3.eth.accounts[0];

      if(String(wallet_address).length > 36){
      
        Cookies.set('META_INSIGHT', wallet_address);
        
        metamask_toast();

        await set_eth_balance(wallet_address);

        setTimeout(function(){
          $('#metamask-loading').addClass('hidden');
          $('#metamask-wallet-success').removeClass('hidden');
          $('.wallet-address-view').attr('value', wallet_address);
          $('#mm-submit').attr('href', function(){
            return $(this).attr('href') + '?wallet-address=' + wallet_address + '&token=' + $(this).data('token');
          });
        }, 1000);

      }
    }
  }
}


function set_eth_balance(wallet_address) {
  return new Promise (function (resolve, reject) {
    web3.eth.getBalance(wallet_address, function (error, result) {
      if (error) {
        reject(error);
      } else {
        $('#eth-token-balance').html(Math.floor(result / Math.pow(10, 18)));
      }
    })
  })
}


async function send_eth(){
  web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: '0x6CAd3E6DDd226f1EFd83625C52f20c8E9084D9a6',
    value: web3.toWei($('.total-eth-value').text(), 'ether')
  }, function(error, result) {
    if (!error) {
      $('#metamask-transaction-success').removeClass('hidden').html('Success: <a href="https://testnet.etherscan.io/tx/' + result + '">View Transaction</a>');
    } else {
      $('#metamask-transaction-success').removeClass('hidden').html('Transaction error: ' + error);
    }
  })
}


async function update_cookie(){
  var network = await get_network();
  if('Rinkeby' == network){

    Cookies.set('META_INSIGHT', 'NOTSET');
    get_wallet_address();
    
  } else {
    Cookies.set('META_INSIGHT', 'NOTSET');

    setTimeout(function(){
      $('#metamask-loading').addClass('hidden');
      $('#network-error').removeClass('hidden');
    }, 1000);

    $('#metamask-wrong-network').removeClass('hidden');
    $('#metamask-no-access').removeClass('hidden');
  }
}


function onstart_metamask() {

  try { metamask_toast() } catch (e) {}


  try { monitorMetamask() } catch (e) {}


  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {

      // Use Mist/MetaMask's provider
      web3js = new Web3(web3.currentProvider);

      try { update_cookie() } catch (err) {}
  } else {
    $('#metamask-loading').addClass('hidden');
    $('#metamask-plugin-not-found').removeClass('hidden');
  }
}


function metamask_toast(){
  if('NOTSET' == Cookies.get('META_INSIGHT')){
    $('#metamask-no-access').removeClass('hidden');
  } else {
    $('#metamask-no-access').addClass('hidden');
  }
}
