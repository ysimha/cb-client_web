import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    
  } from '@angular/router';
  import { Injectable } from '@angular/core';
//   import { Observable } from 'rxjs/Observable';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(private router: Router, private authService: AuthService) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      console.log('route::' + route.url);
      console.log('state::' + state.url);
      this.authService.isAuthenticated().subscribe(auth => {
        console.log("AuthGuard AUTH: "+auth);
        if (!auth) {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      });
      console.log('wait for observerble' );
      return true;
    }
  }
  