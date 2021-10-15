import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialIncludesModule } from '../app-material-include.module';

import { ExchangesComponent } from './exchanges/exchanges.component';
import { ExchangeSummaryComponent } from './exchanges/exchange-summary.component';

@NgModule({
  declarations: [ExchangesComponent, ExchangeSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialIncludesModule,
  ]
})
export class ExchangeModule { }
