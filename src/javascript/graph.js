import Chart from 'chart.js/auto';
import axios from 'axios';


const coin_api = (coin)=>{
    return Promise.resolve(
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`)
    )
}
// const coin_info = (coin_api("litecoin").then(data => { return (data.data.prices)}));

document.addEventListener("DOMContentLoaded", e => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const btc = document.getElementById("bitcoin")
    const ltc = document.getElementById("litecoin")
    var eth = document.getElementById("ethereum")
    var doge = document.getElementById("dogecoin")
    let days = [];
    let prices = [];
    let myChart;

    function getDataAndGenerateChartAftewards(info, createChartCallback, chartOptions, isUpdate = true) {
        coin_api(info)
        .then(({ data }) => {
            if (isUpdate) {
                days = [];
                prices = [];
            }
            data.prices.forEach(price => {
                    let date = new Date(price[0])
                    days.push(date.toLocaleDateString("en-US"));
                    prices.push(price[1]);
                }
            );
        }).then(() => {
            createChartCallback(info, chartOptions);
        }).catch((error) => {
            console.log("nogood days");
        });
    }

    function createChartCallback(info, { backgroundColor, borderColor }) {
        const data = { 
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: info,
                    data: prices, 
                    backgroundColor,
                    borderColor,
                    tension: 0.1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'black'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'black'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'black'
                        }
                    }
                }
            },
        };
        myChart = new Chart(ctx, data);
    }

    function updateChartCallback(info, { backgroundColor, borderColor }) {
        const data = {
            labels: days,
            datasets: [{
                label: info,
                data: prices,
                backgroundColor,
                borderColor,
                tension: 0.1
            }]
        };
        myChart.data = data;
        myChart.update();
    }
    // window.updateChart = updateChartCallback;

    let coinName = 'bitcoin';
    // Initial call to API for creating new Chart on the page.
    getDataAndGenerateChartAftewards(coinName, createChartCallback, {backgroundColor: 'white', borderColor: 'blue'}, false);

    const coinBtns = document.querySelectorAll('.logo');
    coinBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            let chartOptions = e.currentTarget.dataset;
            coinName = e.currentTarget.id;
            getDataAndGenerateChartAftewards(coinName, updateChartCallback, chartOptions);
        });
    })

});
