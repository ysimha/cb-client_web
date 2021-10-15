import { Component, OnInit , Input } from '@angular/core';
import { BotInstance , State , Position } from '../bot-instance';
import { Observable } from 'rxjs/internal/Observable';
import { BotInstanceService } from '../bot-instance.service';
import { PositionUtils } from '../bot-utils';

@Component({
  selector: 'app-bot-instance',
  templateUrl: './bot-instance.component.html',
  styleUrls: ['./bot-instance.component.css']
})
export class BotInstanceComponent implements OnInit {

  botInstanceObservable: Observable<BotInstance[]>;

  prev:number = 0;
  lastColor:string='green';

  constructor(private botInstanceService: BotInstanceService) { 
    this.botInstanceObservable = botInstanceService.botInstanceObservable;
  }
  
  ngOnInit() { }

  priceChange(position:Position){
    var last = position.lastTicker.last;
    if(last!=this.prev){
      this.lastColor = last < this.prev ? 'red' : 'green';
      this.prev = last;
    }
    return this.lastColor;
  }

  instanceStatus(botInstance:BotInstance){
    if(botInstance==undefined || botInstance.state==undefined)return "Wait for signal";
    return "Active position"
  }

  calcAveEnter(position:Position):number{
    return PositionUtils.calcAveEnter(position);
  }

  calcAveSold(position:Position):number{
    return PositionUtils.calcAveSold(position);
  }

  nextTarget(position:Position):number{
    return PositionUtils.nextTarget(position);
  }

  positionValue(position:Position):number{
    return PositionUtils.positionValue(position);
  }

  quantityBought(position:Position):number{
    return PositionUtils.totalQuantityBought(position);
  }
  quantitySold(position:Position):number{
    return PositionUtils.quantitySold(position);
  }

  totalSold(position:Position):number{
    return PositionUtils.totalSold(position);
  }

  calcTotalInvested(position:Position):number{
    return PositionUtils.totalInvested(position);
  }

  calcPercent(position:Position):number{
    let value = PositionUtils.positionValue(position);
    let totalInvested = PositionUtils.totalInvested(position);
    return (( value / totalInvested) * 100 );//-100;
  }
}
