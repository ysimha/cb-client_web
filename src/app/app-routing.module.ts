import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
 import {RegisterComponent} from './auth/register/register.component';
import {AppComponent} from './app.component';
import { HomeComponent} from './home/home.component';
import { AuthGuard } from './auth/auth-guard';
import { AccountsSettingsComponent } from './config/accounts-settings/accounts-settings.component';
import { BotConfigComponent } from './config/bot-config/bot-config.component';
import { BotActivationComponent } from './bot/bot-activation/bot-activation.component';
import { BotDashboardComponent } from './bot/bot-dashboard/bot-dashboard.component';
import { GaugeComponent } from './bot/bot-instance/gauge/gauge.component';
import { ChartComponent } from './bot/bot-instance/chart/chart.component';
import { ExchangesComponent } from './exchange/exchanges/exchanges.component';
import { HistoryComponent } from './history/history/history.component';

const appRoutes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accounts', component: AccountsSettingsComponent , canActivate: [AuthGuard] },
  { path: 'config', component: BotConfigComponent , canActivate: [AuthGuard] },
  { path: 'activate', component: BotActivationComponent , canActivate: [AuthGuard] },
  { path: 'dashboard', component: BotDashboardComponent , canActivate: [AuthGuard] },
  { path: 'exchanges', component: ExchangesComponent , canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent , canActivate: [AuthGuard] },

  
  { path: 'gauge', component: GaugeComponent , canActivate: [AuthGuard] },
  { path: 'chart', component: ChartComponent , canActivate: [AuthGuard] },


  // otherwise redirect to profile
  { path: '**', redirectTo: '/home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
