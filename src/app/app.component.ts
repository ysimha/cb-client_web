import { Component, OnInit , ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent  implements OnInit {
  
  private authenticated:boolean = false ;
  private authUser:string = "" ;
 
  constructor(private authService:AuthService ){

    this.authService.verifyAuth();

    this.authService.stateObserver().subscribe(
      state=>{
        this.authenticated = state.authenticated;
        if(this.authenticated && state.credentials ){
          this.authUser = state.credentials.username;
        }
      }
    );
  }

  public ngOnInit() {}

  logout(){
    console.log("logout() ");
    this.authService.signout();
  }
}
