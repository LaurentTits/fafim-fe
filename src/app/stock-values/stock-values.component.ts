import { Cotation } from '../models/Cotation.model';

import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';

import { Pagination } from '../models/Pagination.model';
import { StockData } from '../models/StockData.model';
import { StockValue } from '../models/StockValue.model';
import { FondsLocalService } from '../services/fonds-local.service';

import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable, throwError } from 'rxjs';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-stock-values',
  templateUrl: './stock-values.component.html',
  styleUrls: ['./stock-values.component.css']
})
export class StockValuesComponent implements OnInit {
  /*private url = "http://api.marketstack.com/v1/eod?access_key=12813b25d1f4e1ff20d29cc1629c43e4&symbols=AAPL";

  private stockValues: StockValue ;

  private fondsValues: StockValue[]; **/

  @Input() symbol : string ;

  private url : string;
  private authToken : string ;

  public quote : String = '';

  private lastValue: number;
  private cotations: Cotation[];

  fondsLocalSubscription: Subscription;

  constructor(private httpClient: HttpClient,
            private fondsLocalService: FondsLocalService,
            private route: ActivatedRoute
              )
    {

    }

  public lineChartData: ChartDataSets[] = [];
  /*[
    { data: [85, 30, 68, 95, 103, 75, 80], label: 'Apple' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];**/
  public lineChartLabels: Label[] = [];
  // ['20.04.2021', '21.04.2021', '22.04.2021', '23.04.2021', '24.04.2021', '25.04.2021', '26.04.2021'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    /**,
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }**/
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  ngOnInit(): void {
    this.url = "http://localhost:8000/api/fondsLocal/"+this.symbol;
    this.authToken = "3>hL\\AK&$`,yc%Y8";

    this.fondsLocalSubscription = this.fondsLocalService.fondsLocalSubject.subscribe(
      (cotations: Cotation[]) => {
       this.cotations = cotations;
     }
    );
    this.fondsLocalService.emitFondsLocalSubject();

    this.getFondsValuesFromServer();
  }

  ngOnDestroy() {
    this.fondsLocalSubscription.unsubscribe();
  }

  getFondsValuesFromServer() {
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<Cotation[]>(this.url,{headers})
        .subscribe(
          (response) => {
            this.cotations = response;
            this.quote = 'action ' + response[0].symbol + ' - cours (de clôture d\'hier) : ' + this.cotations[0].high
            console.log(this.quote);

            let onlyValues: number[] = [];
            let dates : string[] = [];
            let i:number;

            for (i=0; i < response.length; i++){
              onlyValues[i] = response[i].close;
              dates[i] = response[i].date.date.substr(0,10);
            }


            this.lineChartData = [
              { data: onlyValues.reverse(), label: this.symbol }
            ];
            this.lineChartLabels = dates.reverse();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

  getLastValue(){
    //this.lastValue = this.fondsValues[this.fondsValues.length-1].data[0].close;
    this.lastValue = this.cotations[this.cotations.length-1].close;

    return this.lastValue;

  }

  onFetch() {
    this.getFondsValuesFromServer();
  }

  /** onFetch2() {
    let storedValues: StockData[];
    storedValues = this.stockValues.data;

    let onlyValues: number[] = [];
    let dates : string[] = [];
    let i:number;

    for (i=0; i < storedValues.length; i++){
      onlyValues[i] = storedValues[i].close;
      dates[i] = storedValues[i].date;
    }


    this.lineChartData = [
      { data: onlyValues.reverse(), label: 'Apple' }
    ];
    this.lineChartLabels = dates.reverse();
  } */


}
