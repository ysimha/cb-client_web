import { Component, OnInit, OnDestroy } from '@angular/core';
import { BotInstanceService } from '../../bot-instance.service';
import { BotInstance, Position } from '../../bot-instance';
import { PositionUtils } from '../../bot-utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit, OnDestroy {

  componentMessage: string;
  options: any;
  chart: any;

  aveBuyPrice: number;
  botInstanceSubscription: Subscription;
  constructor(private botInstanceService: BotInstanceService) {
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  ngOnInit() {
    this.botInstanceSubscription = this.botInstanceService.botInstanceObservable.subscribe(
      data => {
        if (data != undefined && data[0] != undefined) {
          this.componentMessage = undefined;
          var instance: BotInstance = data[0];
          this.initGauge(data[0]);
        }
        else {
          this.componentMessage = "no active instance found for user profile."
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.botInstanceSubscription.unsubscribe();
  }

  initGauge(botInstance: BotInstance) {
    if (this.options) {

      this.chart.series[0].points[0]
        .update(botInstance.state.position.lastTicker.last);

    } else {
      this.options = {

        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: "#000000",
        },

        title: {
          text: 'Position Status'
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#FFF'],
                [1, '#333']
              ]
            },
            borderWidth: 0,
            outerRadius: '109%'
          }, {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, '#333'],
                [1, '#FFF']
              ]
            },
            borderWidth: 1,
            outerRadius: '107%'
          }, {
            // default background
          }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
          }]
        },

        // the value axis
        yAxis: {
          min: botInstance.state.position.stoploss,
          max: botInstance.state.position.targets[botInstance.state.position.targets.length - 1],

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',

          tickPixelInterval: 50,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 2,
            rotation: 'auto'
          },
          title: {
            text: 'BTC'
          },
          plotBands: this.calcPlotBands(botInstance.state.position)
        },
        series: [{
          name: 'Speed',
          data: [botInstance.state.position.lastTicker.last],
          tooltip: {
            valueSuffix: 'BTC'
          }
        }]
      };

      // console.warn(this.options);
      
    }
  }

  calcPlotBands(position: Position) {
    let plotBands = new Array();
    plotBands.push({
      from: position.stoploss,
      to: PositionUtils.calcAveEnter(position),
      color: 'red' // red
    });

    let colors:any[] = getColors(position.targets.length);

    let numOfSells = position.sellTrades.length;

    for (let i = 0; i < position.targets.length; i++) {
      plotBands.push(
        {
          from: plotBands[i].to,
          to: position.targets[i],
          color: (i+1) > numOfSells ? colors[i] : 'white'
        }
      );
    }
    return plotBands;
  }
}

function getColors(length:number){
  let colors = new Array();
  let jump:number = 100/length;

  for (let i = 1; i <= length; i++) {
    colors.push(numberToColorHsl(i * jump));
  }
  return colors;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
/**
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

// convert a number to a color using hsl
function numberToColorHsl(i) {
  
  // as the function expects a value between 0 and 1, and red = 0° and green = 120°
  // we convert the input to the appropriate hue value
  var hue = i * 1.2 / 360;
  // we convert hsl to rgb (saturation 100%, lightness 50%)
  var rgb = hslToRgb(hue, 1, .5);
  // we format to css value and return
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}