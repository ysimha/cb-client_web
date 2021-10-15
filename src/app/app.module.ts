import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialIncludesModule } from './app-material-include.module';

import { RouterModule, Routes } from '@angular/router';
import {AppMaterialModule} from './app.material-module';
import { AppComponent } from './app.component';
import { AuthModule} from './auth/auth.module';
import { ConfigModule} from './config/config.module';
import { Routing } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard';
import { BotModule } from './bot/bot.module';
import { ExchangeModule} from './exchange/exchange.module';
import { HistoryModule} from './history/history.module';

@NgModule({
  declarations: [
    // FormsModule,
    // ReactiveFormsModule,
    AppComponent,
    HomeComponent
  ],
  imports: [
    MaterialIncludesModule,
    AppMaterialModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule, 
    ConfigModule,  
    BotModule,
    ExchangeModule,
    HistoryModule,
    Routing
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
