import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router ,ActivatedRoute} from "@angular/router";
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public _username:string;
  public _password:string;
  errorMessage: string;

  constructor(   
     private router: Router ,private  authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    console.log("register: "+ JSON.stringify("username: "+this._username+", password: "+this._password));
    this.authService.register(this._username, this._password)
    .subscribe(
      (data) => {
        this.router.navigate(['login']);
      },
      (err) => {
         console.log("ERROR: "+ JSON.stringify(err));
        this.errorMessage = 'Registrating Failed, '+err.error.errorMessage;
        return;
      }
      );
  }

  cancel(){
    console.log("Registrating Cancel Pressed");
    this.router.navigate(['home']);
  }

}