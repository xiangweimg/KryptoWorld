import Chart from 'chart.js/auto';
import axios from 'axios';


const coin_api = (coin)=>{
    return Promise.resolve(
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`)
    )
}

document.addEventListener("DOMContentLoaded", e => {
    const ctx = document.getElementById('myChart').getContext('2d');

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
                            color: 'black',
                            font: {
                                size:15
                            }
                        },
                        title: {
                            display: true,
                            text: 'Dates',
                            color: '#023020',
                            font: {
                              // lineHeight: 2.0,
                            family: 'Lucida Sans',
                            size: 25
                            }
                          }
                    },
                    
                    y: {
                        display:true,
                        ticks: {
                            color: 'black',
                            font: {
                                size: 15
                            }
                        },
                        title: {
                            display: true,
                            text: 'Price ($USD)',
                            color: '#023020',
                            font: {
                              // lineHeight: 2.0,
                            family: 'Lucida Sans',
                            size: 25
                            }
                          }
                    },
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

