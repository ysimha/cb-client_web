import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialIncludesModule } from '../app-material-include.module';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { Routing} from '../app-routing.module';
import { TokenInterceptor } from './token-interceptor';
import { AuthService } from './auth.service';
import { TokenStorage} from './token-storage'
import { AuthInterceptor } from './auth-interceptor';
import { AuthGuard } from './auth-guard';

@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    MaterialIncludesModule,
    CommonModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AuthModule { }
