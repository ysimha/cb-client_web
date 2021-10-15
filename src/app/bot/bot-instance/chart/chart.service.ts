import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {ChartData} from './chart-data';

const apiUrl = environment.baseApiUrl + '/charts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  chartData(exchange:string,symbol:string,interval:string): Observable<ChartData[]> {
    // return this.http.get<ChartData[]>(apiUrl+"?exchange="+exchange+"&symbol="+symbol+"&interval="+interval);
    return this.http.get<ChartData[]>(
      apiUrl+"?exchange="+exchange+"&symbol="+symbol+"&interval="+interval);
  }

  tailChartData(exchange:string,symbol:string,interval:string,last:number): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(
      apiUrl+"/tail"+"?exchange="+exchange+"&symbol="+symbol+"&interval="+interval+"&last="+last)
  }
}

