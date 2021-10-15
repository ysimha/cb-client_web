import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { TokenStorage } from './token-storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';


const TOKEN_HEADER_KEY = 'X-AUTH-TOKEN';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("STATUS HttpResponse: " + event.status);
          const token = event.headers.get(TOKEN_HEADER_KEY);
          if (token) {
            console.log('saving token ::' + token.toString);
            this.token.save(token);
          }
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log("ERROR: " + JSON.stringify(err));
          // console.log("STATUS: " +err.status);
          // console.log('req url :: ' + req.url);
          if (!req.url.endsWith('/auth/user') && err.status === 401) {
            console.log("UNAUTHORIZED !!!!");
            this.router.navigate(['login']);
            this.token.destroy();
          }
        }
      }
    );
  }
}
