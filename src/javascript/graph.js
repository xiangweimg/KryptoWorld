import Chart from 'chart.js/auto';
import axios from 'axios';


const coin_api = (coin)=>{
    return Promise.resolve(
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`)
    )
}
const coin_api2 = (coin)=>{
    return Promise.resolve(
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`)
    )
}


document.addEventListener("DOMContentLoaded", e => {
    const ctx = document.getElementById('myChart').getContext('2d');
    let status = true
    let text = "bitcoin"
    let days = [];
    let prices = [];
    let myChart;
    function getDataAndGenerateChartAftewards(info, createChartCallback, chartOptions, isUpdate = true) {
        let get_api = coin_api(info)
        if(status === true){
            get_api = coin_api(info)
        }
        else{
            get_api = coin_api2(info)
        }           
                    get_api.then(({ data }) => {
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
                    alert('Error: Invalid Search!! Please Enter the Fullname of Coins')
                })  
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
                interaction: {
                    intersect: false,
                    mode: 'index',
                  },
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
        text = data.data.datasets[0].label
    }

    function updateChartCallback(info, { backgroundColor, borderColor }) { 
        text = info
        // console.log(text);
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
        text = myChart.data.datasets[0].label
        // console.log(text);
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
        })
    })
    const search_coin = document.getElementById('search-button');
    const input = document.getElementById('search-box');
    const graphDate = document.getElementById('graph-days')
    search_coin.addEventListener("click", e=> {
        getDataAndGenerateChartAftewards(input.value, updateChartCallback, {backgroundColor: 'white', borderColor: 'green'});
        graphDate.textContent = " 30 ";
    });
    
    // Execute a function when the user presses a key on the keyboard
        input.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        search_coin.click();
      }
    });
    const monthly = document.getElementById('monthly-button')
    const weekly = document.getElementById('weekly-button')

    weekly.addEventListener("click", e => {
        status = false
        getDataAndGenerateChartAftewards(text, updateChartCallback, {backgroundColor: 'white', borderColor: 'green'});
        status = true
        graphDate.textContent = '7';
    })
    monthly.addEventListener("click", e => {
        status = true
        getDataAndGenerateChartAftewards(text, updateChartCallback, {backgroundColor: 'white', borderColor: 'green'});
        graphDate.textContent = "30 ";
    })

    
});
