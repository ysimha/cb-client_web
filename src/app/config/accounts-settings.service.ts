import { Injectable, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { retry } from 'rxjs/operator/retry';

@Injectable()
export class AccountsSettingsService implements OnInit {

  userProfile: UserProfile = new UserProfile();

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): Observable<any> {
    return this.userProfileService.getProfile()
      .map((res: UserProfile) => this.userProfile = res)
      .map(us => JSON.stringify(us))
      .map(str => JSON.parse(str))
      .catch((error: any) => Observable.throw(error));
  }
}