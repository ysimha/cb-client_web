export class ExchangeBalance {

    id:string;
	name:string;
	balance:number;
	available:number;
	pending:number;
	cryptoAddress:any;

	//client additional info
	btcValue:number;
	fiatValue:number;
	perc24Change:number;
	volume:number;
}
