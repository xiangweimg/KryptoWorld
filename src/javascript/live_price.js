
var btc = document.getElementById("bitcoin_price")
var ltc = document.getElementById("litecoin_price")
var eth = document.getElementById("ethereum_price")
var doge = document.getElementById("dogecoin_price")

var liveprice = {
    "async": true,
    "scroosDomin": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    "method": "GET",
    "headers": {}
}

$.ajax(liveprice).done(function (response) {
    btc.innerHTML = response.bitcoin.usd;
    ltc.innerHTML = response.litecoin.usd;
    eth.innerHTML = response.ethereum.usd;
    doge.innerHTML = response.dogecoin.usd;
});
//website: https://www.coingecko.com/en/api/documentation

