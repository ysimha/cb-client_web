import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";
import { AuthService } from '../auth.service'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AwErrorStateMatcher } from '../../aw-error-state-matcher';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  errorMessage:string;
  
  emailFormControl = new FormControl('', [Validators.required,Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    emailFormControl: this.emailFormControl,
    passwordFormControl: this.passwordFormControl,
  });

  matcher = new AwErrorStateMatcher();

  constructor(
    private router: Router ,private  authService: AuthService) { }

  ngOnInit() { }

  login(){
    console.log("login: "+ JSON.stringify("username: "+this.emailFormControl.value+", password: "+this.passwordFormControl.value));
    this.authService.login(this.emailFormControl.value,this.passwordFormControl.value)
    .subscribe(
      (data) => {
        // console.log(data);
        this.router.navigate(['']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = 'login failed - unauthorized';
          return;
        }
      );
  }

  logout(){
    this.authService.signout();
  }
}