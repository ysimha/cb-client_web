import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserProfile } from '../user-profile';
import { AccountsSettingsService } from '../accounts-settings.service';
import { AddExchangeAccountComponent } from './add-exchange-account/add-exchange-account.component';
import { ExchangeAccount } from '../exchange-account';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styleUrls: ['./accounts-settings.component.css']
})

export class AccountsSettingsComponent implements OnInit {

  userProfile: UserProfile = new UserProfile();
  constructor(
    private accountsSettingsService: AccountsSettingsService,
    public accountExchangeDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.accountsSettingsService.getProfile().subscribe(
      profile => {
        this.userProfile = profile;
      },
      err => {
        console.log(err);
      }
    );
  }

  openExchangeDialog(): void {
    let dialogRef = this.accountExchangeDialog.open(AddExchangeAccountComponent, {
      panelClass: 'cb-no-padding-dialog', width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
    });
  }

  deleteExchangeAccount(exchange: ExchangeAccount) {
    // var index = this.userProfile.exchangeAccounts.indexOf(exchange, 0);
    // if (index > -1) {
    //   this.userProfile.exchangeAccounts.splice(index, 1);
    // }
    // this.updateProfle();
  }
}