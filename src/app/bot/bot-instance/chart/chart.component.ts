import { Component, OnInit , OnDestroy } from '@angular/core';
import { ChartService } from './chart.service';
import { BotInstanceService } from '../../bot-instance.service';
import { PositionUtils } from '../../bot-utils';
import { BotInstance, Position, Ticker } from '../../bot-instance';
import { Observable , Subscription } from 'rxjs';
import { ChartData } from './chart-data';
import { log } from 'util';
import { logging } from 'selenium-webdriver';

declare var require: any;

var equal = require('deep-equal');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit , OnDestroy{

  componentMessage: string;

  options: any;
  chart: any;
  // position: Position;

  lastTicker: Ticker = { bid:  0, ask:  0,last: 0};
  lastColor:string;
  bidColor:string;
  askColor:string;

  interval: string = "5m";
  symbol: string
  exchange: string;

  aveBuyPrice: number;
  stoploss: number;
  nextTraget: number;

  subscription:Subscription;
  botInstanceSubscription:Subscription;

  constructor(private chartService: ChartService, private botInstanceService: BotInstanceService) { }

  ngOnInit() {

    this.botInstanceSubscription = this.botInstanceService.botInstanceObservable.subscribe(
      data => {

        // console.warn(data);
        
        if (data && data[0] && data[0].state) {

          let currTicker = data[0].state.position.lastTicker;
         
         
          this.lastColor = this.newColor(currTicker.last, this.lastTicker.last, this.lastColor);
          this.askColor = this.newColor(currTicker.ask, this.lastTicker.ask, this.askColor);
          this.bidColor = this.newColor(currTicker.bid, this.lastTicker.bid, this.bidColor);

          this.lastTicker = currTicker;
           this.componentMessage = undefined;

          if (this.hasChange(data[0].state.position)) {

            console.log("Instance position changed, reload chart.");

            let bot = data[0];
            this.symbol = bot.state.symbol.symbol;
            this.exchange = bot.exchangeAccount.exchange;

            this.aveBuyPrice = PositionUtils.calcAveEnter(bot.state.position);
            this.stoploss = bot.state.position.stoploss;
            this.nextTraget = PositionUtils.nextTarget(bot.state.position);
            this.showChart();
          }
        }
        else {
          this.componentMessage = "no active instance found for user profile."
        }
      }
    );

    this.subscription = Observable.timer(1000, 10000).subscribe(() => {
        this.loadNewPoints();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.botInstanceSubscription.unsubscribe();
  }

  setInterval(interval:string){
    if(interval!=this.interval){
      this.interval = interval;
      this.showChart() ;
    }
  }
  hasChange(position: Position): boolean {
    return this.aveBuyPrice != PositionUtils.calcAveEnter(position) ||
      this.stoploss != position.stoploss ||
      this.nextTraget != PositionUtils.nextTarget(position);
  }

  newColor(curr:number, last:number, color:string){
    return curr > last ? "green" : curr < last ? "red" : color;
  }

  loadNewPoints() {
    if (this.chart) {
      let series = this.chart.series[0];
      let points = series.points;
      let lastDate = points[points.length - 1].x;
      
      this.chartService.tailChartData(this.exchange, this.symbol, this.interval, lastDate)
        .subscribe(
        data => {
          if (data && data.length > 0) {
            points[points.length - 1].remove();

            data.forEach(cd => series.addPoint([cd.openTime, cd.open, cd.high, cd.low, cd.close], true));

            // this.chart.redraw();
          }
        }
        )
    } else {
      // alert('init chart, first!');
    }
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  showChart() {
    this.chartService.chartData(this.exchange, this.symbol, this.interval)
      // .map(data => data.map(cd => [cd.closeTime, cd.close]))
      .map(data => data.map(cd => [cd.openTime, cd.open, cd.high, cd.low, cd.close]))
      .subscribe(
      data => {

        this.options = {
          series: [{
            name: this.symbol,
            data: data,
          }],

          colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],

          lang: {
            months: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
            shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },

          chart: {
            // type: 'line',
            type: 'candlestick',
            height: 500,
            width: 850,

            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
              stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
              ]
            },
            style: {
              fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
          },

          title: {
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase',
              fontSize: '20px'
            }
          },
          subtitle: {
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase'
            }
          },

          xAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                color: '#E0E0E3'
              }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
              style: {
                color: '#A0A0A3'

              }
            }
          },
          yAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                color: '#E0E0E3'
              }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
              style: {
                color: '#A0A0A3'
              }
            },

            /////////////////////////////      
            plotLines: [{
              value: this.aveBuyPrice,
              color: 'yellow',
              // dashStyle: 'shortdash',
              width: 1,
              label: {
                text:'Current price'
              }
            },{
              value: this.stoploss,
              color: 'red',
              // dashStyle: 'shortdash',
              width: 1,
              label: {
                text:'Stop loss'
              }
            }, {
              value: this.aveBuyPrice,
              color: 'orange',
              // dashStyle: 'shortdash',
              width: 1,
              label: {
                align:'center',
                text: 'Ave buy price',
                y: 10,
                x: 20
              }
            }, {
              value: this.nextTraget,
              color: 'green',
              // dashStyle: 'shortdash',
              width: 1,
              label: {
                text: 'Next targer'
              }
            }]
            //////////////////////////////
          },

          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
              color: '#F0F0F0'
            }
          },

          plotOptions: {
            series: {
              dataLabels: {
                color: '#B0B0B3'
              },
              marker: {
                lineColor: '#333'
              }
            },
            boxplot: {
              fillColor: '#505053'
            },
            candlestick: {
              lineColor: 'white',
              color: 'red',
              upColor: 'green'
            },
            errorbar: {
              color: 'white'
            }
          },

          legend: {
            itemStyle: {
              color: '#E0E0E3'
            },
            itemHoverStyle: {
              color: '#FFF'
            },
            itemHiddenStyle: {
              color: '#606063'
            }
          },
          credits: {
            style: {
              color: '#666'
            }
          },
          labels: {
            style: {
              color: '#707073'
            }
          },

          drilldown: {
            activeAxisLabelStyle: {
              color: '#F0F0F3'
            },
            activeDataLabelStyle: {
              color: '#F0F0F3'
            }
          },

          navigation: {
            buttonOptions: {
              symbolStroke: '#DDDDDD',
              theme: {
                fill: '#505053'
              }
            }
          },
          // scroll charts
          rangeSelector: {

            // inputEnabled: false,
            selected: 2,
            buttons: [{
              type: 'minute',
              count: 60,
              text: '1h'
            }, {
              type: 'day',
              count: 1,
              text: '1d'
            }, {
              type: 'week',
              count: 1,
              text: '1w'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'year',
              count: 1,
              text: '1y'
            }, {
              type: 'all',
              text: 'All'
            }],

            buttonTheme: {
              fill: '#505053',
              stroke: '#000000',
              style: {
                color: '#CCC'
              },
              states: {
                hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                    color: 'white'
                  }
                },
                select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                    color: 'white'
                  }
                }
              }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
              backgroundColor: '#333',
              color: 'silver'
            },
            labelStyle: {
              color: 'silver'
            },
          },

          navigator: {
            handles: {
              backgroundColor: '#666',
              borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
              color: '#7798BF',
              lineColor: '#A6C7ED'
            },
            xAxis: {
              gridLineColor: '#505053'
            }
          },

          scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
          },

          // special colors for some of the
          legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
          background2: '#505053',
          dataLabelsColor: '#B0B0B3',
          textColor: '#C0C0C0',
          contrastTextColor: '#F0F0F3',
          maskColor: 'rgba(255,255,255,0.3)'
        };

        // let chart = new Chart(this.options);
        // this.chart = chart; 
      },
      err => {
        console.log("dayHistoryClose ERROR: " + JSON.stringify(err));
      }
      );
  }
}
