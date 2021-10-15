import { NgModule, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialIncludesModule } from '../app-material-include.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Routing } from '../app-routing.module';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts/highstock';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { BotActivationComponent } from './bot-activation/bot-activation.component';
import { BotDashboardComponent } from './bot-dashboard/bot-dashboard.component';
import { BotInstanceComponent } from './bot-instance/bot-instance.component';
import { GaugeComponent } from './bot-instance/gauge/gauge.component';
import { ChartComponent } from './bot-instance/chart/chart.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

declare var require: any;

export function highchartsFactory() {
  const h = highcharts;
  // const hc = require('highcharts');
  const hm = require('highcharts/highcharts-more');
  const mr = require('highcharts/modules/solid-gauge');
  // mr(hc);

  hm(h);

  // hc(h);

  return h;
}

@NgModule({
  declarations: [BotActivationComponent, BotDashboardComponent, BotInstanceComponent, GaugeComponent, ChartComponent],
  imports: [
    MaterialIncludesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    ChartModule,
  ],
  // entryComponents: [AddExchangeAccountComponent],
  providers: [
    {
      provide: HighchartsStatic,               //-----> and this too
      useFactory: highchartsFactory
    },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class BotModule implements OnInit, OnDestroy {

  ngOnInit() {
    console.warn("XXXXXXXXXXXXX ngOnInit XXXXXXXXXXXXXXXx");
  }

  ngOnDestroy() {
    console.warn("XXXXXXXXXXXXX ngOnDestroy XXXXXXXXXXXXXXXx");
  }
}
