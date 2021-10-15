import { Component, OnInit } from '@angular/core';
// import { BotInstanceService } from '../bot-instance.service';
import { BotInstance } from '../bot-instance';
// import { Observable } from 'rxjs/internal/Observable';
// import { timer } from 'rxjs/observable/timer';
// import { Subscription } from 'rxjs/internal/Subscription';
import { timer, Observable, Subscription , BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bot-dashboard',
  templateUrl: './bot-dashboard.component.html',
  styleUrls: ['./bot-dashboard.component.css']
})
export class BotDashboardComponent implements OnInit {


  // private _botInstanceObservable: BehaviorSubject<BotInstance[]> = new BehaviorSubject([]);
  // public readonly botInstanceObservable: Observable<BotInstance[]> = this._botInstanceObservable.asObservable();

  // timerSubscription:Subscription;

  // constructor(private botInstanceService: BotInstanceService) { 
  //   this.loadData();
  // }

  ngOnInit() {
  //   this.timerSubscription = Observable.timer(1000, 5000)
  //   .subscribe(() => {
  //     this.loadData();
  //   });
  }

  // loadData(){
  //   this.botInstanceService.getInstances().first().subscribe(
  //     data=>{
  //       this._botInstanceObservable.next(data);
  //     },
  //     err=>console.error(err),
  //   )
  // }
}
