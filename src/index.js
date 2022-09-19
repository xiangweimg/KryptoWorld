// const Heading = require('./scripts/heading');

// document.addEventListener('DOMContentLoaded', () => {
//     const root = document.getElementById('root');
//     const heading = new Heading('Hey');
//     root.innerHTML = heading.heading;
// })
var btc = document.getElementById("bitcoin")
var ltc = document.getElementById("litecoin")
var eth = document.getElementById("ethereum")
var doge = document.getElementById("dogecoin")

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