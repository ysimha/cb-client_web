import { Component, OnInit } from '@angular/core';
import { BotConfig } from '../bot-config';
import { BotConfigService } from '../bot-config.service';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import * as validator from './bot-config-validators';

export class AwErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.css']
})
export class BotConfigComponent implements OnInit {

  errorMessage: string;

  nameFormControl = new FormControl('', [Validators.required]);
  stoplossFormControl = new FormControl('', [validator.amountlValidator(1, 100)]);
  defaultAmountlFormControl = new FormControl('', [validator.amountlValidator(85, 50000)]);
  costAverageFormControl = new FormControl(false);
  useSignalSLFormControl = new FormControl(false);
  useSignalTargetsFormControl = new FormControl(false);

  form = new FormGroup({
    nameFormControl: this.nameFormControl,
    stoplossFormControl: this.stoplossFormControl,
    defaultAmountlFormControl: this.defaultAmountlFormControl,
    costAverageFormControl: this.costAverageFormControl,
    useSignalSLFormControl: this.useSignalSLFormControl,
    useSignalTargetsFormControl: this.useSignalTargetsFormControl,
  });

  matcher = new AwErrorStateMatcher();

  constructor(private botConfigService: BotConfigService,
  ) { }

  ngOnInit() {
    this.botConfigService.get().subscribe(
      bc => {
        let botConfig: BotConfig = bc;
        this.populateFrom(botConfig)
      },
      err => console.error(err)
    )
    this.costAverageFormControl.disable();
    this.useSignalSLFormControl.disable();
    this.useSignalTargetsFormControl.disable();
  }

  populateFrom(botConfig: BotConfig) {
    this.nameFormControl.setValue(botConfig.name);
    this.stoplossFormControl.setValue(botConfig.stoploss);
    this.defaultAmountlFormControl.setValue(botConfig.defaultAmount);
    this.costAverageFormControl.setValue(botConfig.costAverage);
    this.useSignalSLFormControl.setValue(botConfig.useSignalSL);
    this.useSignalTargetsFormControl.setValue(botConfig.useSignalTargets);
    this.form.reset(this.form.value);
  }

  saveBotConfig() {
    let newBotConfig = new BotConfig();
    newBotConfig.name = this.nameFormControl.value;
    newBotConfig.stoploss = this.stoplossFormControl.value;
    newBotConfig.defaultAmount = this.defaultAmountlFormControl.value;
    newBotConfig.costAverage = this.costAverageFormControl.value;
    newBotConfig.useSignalSL = this.useSignalSLFormControl.value;
    newBotConfig.useSignalTargets = this.useSignalTargetsFormControl.value;

    this.botConfigService.update(newBotConfig).subscribe(
      bc => {
        let botConfig: BotConfig = bc;
        console.warn(botConfig);
        this.populateFrom(botConfig);
      },
      err => console.error(err)
    )
  }
}
