import { Position } from './bot-instance';

export namespace PositionUtils {

    export function totalInvested(position: Position): number {
        if (!position.buyTrades || position.buyTrades.length == 0) return 0;
        return position.buyTrades.map(t => t.qty * t.price).reduce((sum, current) => sum + current);
    }

    export function totalQuantityBought(position: Position): number {
        if (!position.buyTrades || position.buyTrades.length == 0) return 0;
        return position.buyTrades.map(t => t.qty).reduce((sum, current) => sum + current);
    }

    export function calcAveEnter(position: Position): number {
        return totalQuantityBought(position) == 0 ? 0 : totalInvested(position) / totalQuantityBought(position);
    }

    export function totalSold(position: Position): number {
        if (!position.sellTrades || position.sellTrades.length == 0) return 0;
        return position.sellTrades.map(t => t.qty * t.price).reduce((sum, current) => sum + current);
    }

    export function quantitySold(position: Position): number {
        if (!position.sellTrades || position.sellTrades.length == 0) return 0;
        return position.sellTrades.map(t => t.qty).reduce((sum, current) => sum + current);
    }

    export function calcAveSold(position: Position): number {
        return quantitySold(position) == 0 ? 0 : totalSold(position) / quantitySold(position);
    }

    export function nextTarget(position: Position): number {
        if (!position.sellTrades || position.sellTrades.length == 0) return position.targets[0];
        if ( position.sellTrades.length < position.targets.length ){
	        return position.targets[position.sellTrades.length];   //targets.get(sellTrades.size());
        }else{
	        return 0;
        }
        // switch (position.sellTrades.length) {
        //     case 0:
        //         return position.target1;
        //     case 1:
        //         return position.target2;
        //     case 2:
        //         return position.target3;
        //     default:
        //         return 0;
        // }
    }

    export function positionValue(position:Position):number{
        let totalBought = totalInvested(position);
        let _totalSold = totalSold(position);
        let remainQuantity:number =  totalQuantityBought(position) -  quantitySold(position);
        let lastPrice = position.lastTicker.last;
        return ( _totalSold + (remainQuantity*lastPrice) ) - totalBought;
    }
}
