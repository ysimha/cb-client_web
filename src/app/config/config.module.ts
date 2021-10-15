import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialIncludesModule } from '../app-material-include.module';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Routing} from '../app-routing.module';

import { UserProfile } from './user-profile';
import { UserProfileService} from './user-profile.service';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { AddExchangeAccountComponent } from './accounts-settings/add-exchange-account/add-exchange-account.component';
import { AccountsSettingsService } from './accounts-settings.service';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { BotConfigService } from './bot-config.service';

@NgModule({
  imports: [
    MaterialIncludesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
  ],
  entryComponents: [AddExchangeAccountComponent],
  declarations: [AccountsSettingsComponent, AddExchangeAccountComponent, BotConfigComponent],
  providers: [
    UserProfileService,
    AccountsSettingsService,
    AddExchangeAccountComponent,
    BotConfigService
  ],
})
export class ConfigModule { }
