import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { HistoryService } from '../history.service';
import { TradingSessionRecord } from '../history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyRecords: TradingSessionRecord[] = [];

  displayedColumns: string[] = ['createdDate', 'symbol', 'profit', 'percent',
    'totalAmountBought', 'totalAmountSold', 'avePriceBought',
    'avePriceSold', 'timeStart', 'timeEnd', 'source'];

  dataSource = new MatTableDataSource(this.historyRecords);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getHistory().subscribe(

      history => {
        console.warn(history)
        if (Array.isArray(history)) {
          this.historyRecords = history;
        } else {
          this.historyRecords = []
          this.historyRecords.push(history)
        }
        this.dataSource = new MatTableDataSource(this.historyRecords);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error(error);
      },
      () => {
        console.info('complete')
      }
    );
  }
  totalProfit() {
    return this.historyRecords.reduce((a, b) => a + (b.totalAmountSold - b.totalAmountBought), 0);
  }

  totalPercent() {
    return ((this.totalAmountSold() / this.totalAmountBought()) * 100) - 100;
  }

  totalAmountBought() {
    return this.historyRecords.reduce((a, b) => a + b.totalAmountBought, 0);
  }

  totalAmountSold() {
    return this.historyRecords.reduce((a, b) => a + b.totalAmountSold, 0);
  }


  calcPercent(historyRecord: TradingSessionRecord): number {
    return ((historyRecord.totalAmountSold / historyRecord.totalAmountBought) * 100) - 100;
  }

  // calcProfit(element:TradingSessionRecord){
  //   let totalBought = element.totalAmountBought * element.avePriceBought;
  //   let totalSold = element.totalAmountSold * element.avePriceSold;
  //   console.warn(totalBought);
  //   console.warn(totalSold);
  //   console.warn(totalSold - totalBought);
  //   return totalSold - totalBought;
  // }
}
