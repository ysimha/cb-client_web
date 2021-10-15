import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../config/user-profile.service';
import { UserProfile } from '../../config/user-profile';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {

  // binance: string = "binance";
  // binance_us: string = "binance_us";
  // userExchanges: string[];
  userProfile: UserProfile = new UserProfile();


  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileService.getProfile().subscribe(
      profile => {
        this.userProfile = profile;
      },
      err => {
        console.log(err);
      });
  }
}
