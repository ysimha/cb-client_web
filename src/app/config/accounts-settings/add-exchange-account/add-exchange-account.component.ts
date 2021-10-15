import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserProfileService } from '../../user-profile.service';
import { ExchangeAccount } from '../../exchange-account';

export class AwErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange-account.component.html',
  styleUrls: ['./add-exchange-account.component.css']
})

export class AddExchangeAccountComponent implements OnInit {

  exchanges: ExchangeAccount[];

  errorMessage: string;

  exchange: ExchangeAccount;
  exchangeFormControl = new FormControl('', [Validators.required]);
  keyFormControl = new FormControl('', [Validators.required]);
  secretFormControl = new FormControl('', [Validators.required]);

  form = new FormGroup({
    exchangeFormControl: this.exchangeFormControl,
    keyFormControl: this.keyFormControl,
    secretFormControl: this.secretFormControl
  });

  matcher = new AwErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddExchangeAccountComponent>,
    private userProfileService: UserProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.userProfileService.getExchanges().subscribe(
      exchanges => {
        this.exchanges = exchanges;
      },
      err => {
        console.log(err);
      }
    );
  }

  addExchange() {
    let newExchangeAccount = new ExchangeAccount();
    newExchangeAccount.exchange = this.exchangeFormControl.value.name;
    newExchangeAccount.publicKey = this.keyFormControl.value;
    newExchangeAccount.secret = this.secretFormControl.value;

    this.userProfileService.addEchangeAccount(newExchangeAccount).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
      },
      err => {
        console.error("addEchangeAccount: " + err.error.errorMessage);
        this.errorMessage = err.error.errorMessage;
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

