import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { MaterialIncludesModule } from '../app-material-include.module';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    MaterialIncludesModule
  ]
})
export class HistoryModule { }
