import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher, MatFormFieldControl } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { BotActivationService } from './bot-activation.service';
import { BotConfig } from '../../config/bot-config';
import { Observable } from 'rxjs/internal/Observable';
import { ExchangeAccount } from '../../config/exchange-account';
import { UserProfileService } from '../../config/user-profile.service';
import { BotActivation } from './bot-activation';
import { BotInstance } from '../bot-instance';

export class AwErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-bot-activation',
  templateUrl: './bot-activation.component.html',
  styleUrls: ['./bot-activation.component.css']
})
export class BotActivationComponent implements OnInit {

  // @Input() botInstanceObservable: Observable<BotInstance[]>;

  errorMessage: string;

  botNameFormControl = new FormControl('', [Validators.required]);
  botConfigIdFormControl = new FormControl('', [Validators.required]);
  exchageFormControl = new FormControl('',[Validators.required]);
  loopFormControl = new FormControl(false);



  activationForm = new FormGroup({
    botNameFormControl: this.botNameFormControl,
    botConfigIdFormControl: this.botConfigIdFormControl,
    exchageFormControl: this.exchageFormControl,
    loopFormControl: this.loopFormControl,
  });

  matcher = new AwErrorStateMatcher();

  botConfigsObservable : Observable<BotConfig[]>;
  exchagesObservable : Observable<ExchangeAccount[]>;

  constructor(private botActivationService: BotActivationService,
              private userProfileService: UserProfileService,
  ) { }

  ngOnInit() {
    this.botConfigsObservable = this.botActivationService.getConfigsId();
    this.exchagesObservable = this.userProfileService.getProfile().map(profile=>profile.exchangeAccounts);
  }

  activate(){
    console.log("activate bot")
    var activation:BotActivation = new BotActivation();
    activation.exchange = this.exchageFormControl.value
    activation.botConfigId = this.botConfigIdFormControl.value;
    activation.loop = this.loopFormControl.value;
    activation.name = this.botNameFormControl.value;

    this.botActivationService.start(activation).subscribe(
      res=> console.log(res),
      err=>{
        console.error(err);
        this.errorMessage = err.error.errorMessage;
      }
    );
  }
}

