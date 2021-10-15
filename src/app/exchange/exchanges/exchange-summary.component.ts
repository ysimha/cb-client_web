import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UserProfileService } from '../../config/user-profile.service';
import { ExchangeAccount } from '../../config/exchange-account';
import { ExchangeBalance } from '../exchange-balance';
import { ExchangesSummaryService } from '../exchanges-summary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exchange-summary',
  templateUrl: './exchange-summary.component.html',
  styleUrls: ['./exchange-summary.component.css']
})
export class ExchangeSummaryComponent implements OnInit {

  @Input() exchange: any;
  exchangeAccount: ExchangeAccount;
  balances: ExchangeBalance[] = [];

  hideSmallBalances = true;
  displayedColumns: string[] = ['coin', 'name', 'balance', 'available', 'precent', '24h', 'btcvalue', 'usdvalue', 'btcrate', 'usdrate'];

  dataSource = new MatTableDataSource(this.balances);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private userProfileService: UserProfileService,
    private exchangesSummaryService: ExchangesSummaryService) {
  }

  ngOnInit() {
    this.userProfileService.getProfile().subscribe(
      profile => {

        console.warn("got profile: -> ")
        console.warn(profile)

        this.exchangeAccount = profile
          .exchangeAccounts.find(ex => ex.exchange = this.exchange);

        if (this.exchangeAccount) {

          this.exchangesSummaryService.getBalances(this.exchangeAccount.exchange)
            .subscribe(
              data => {
                console.warn(data);
                this.balances = data;
                // this.setDataSource();

                this.dataSource = new MatTableDataSource(this.balances)

                this.dataSource.filterPredicate =
                  (data: ExchangeBalance, value: string) => data.balance * data.fiatValue > +value;
                this.applyFilter();
                this.dataSource.sort = this.sort;
              }
            );
        }
      });
  }

  applyFilter() {
    if (this.hideSmallBalances) {
      this.dataSource.filter = "1";
    } else {
      this.dataSource.filter = "0";
    }
  }

  getBalances(): Observable<ExchangeBalance[]> {
    return this.exchangesSummaryService.getBalances(this.exchange);
  }

  totalFiatValue(): number {
    return this.balances.reduce((a, b) => a + (b.fiatValue * b.balance), 0);
  }

  totalBTCValue(): number {
    return this.balances.reduce((a, b) => a + (b.btcValue * b.balance), 0);
  }

  //[(18% × 7.8) + (10% × 6.6) + (11% × 2.7) + (9% × 3.4) + (9% × 0.1) + (14% × 9.4) + (16% × 4.1) + (3% × –10.0) + (10% × 2.1)] = 4.5%
  protfolioPrecentChange(): number {
    let total = this.totalFiatValue();
    return this.balances.reduce(
      (a, b) =>
        a + (b.perc24Change * (b.fiatValue * b.balance / total)), 0);
  }

  precentOfProtfolio(balance: ExchangeBalance): number {
    return this._precentOfProtfolio(balance, this.totalFiatValue())
  }

  _precentOfProtfolio(balance: ExchangeBalance, totalForExchange: number): number {
    return (balance.fiatValue * balance.balance / totalForExchange) * 100;
  }
}
