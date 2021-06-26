import { Fonds } from '../models/Fonds.model';
import { FondsVisuel } from '../models/FondsVisuel.model';
import { BehaviorSubject, Subject, Subscription, Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class FondsService {

  private authToken = "3>hL\\AK&$`,yc%Y8";

  private fondsVisuelArray: FondsVisuel[] = [];
  fondsSubject = new Subject<FondsVisuel[]>();
  /* =[
  {
    id: 1,
    isin: 123456789012,
    name: 'aapl',
    status: 'fonds ESG',
    description: 'pas de commentaires'
  },
  {
    id: 2,
    isin: 123456789013,
    name: 'amzn',
    status: 'fonds non ESG',
    description: 'pas de commentaires'
  },
  {
    id: 3,
    isin: 123456789014,
    name: 'fb',
    status: 'fonds ESG',
    description: 'pas de commentaires'
  },
  {
    id: 4,
    isin: 123456789015,
    name: 'goog',
    status: 'fonds ESG',
    description: 'pas de commentaires'
  },
  {
    id: 5,
    isin: 123456789016,
    name: 'msft',
    status: 'fonds non ESG',
    description: 'pas de commentaires'
  },
  {
    id: 6,
    isin: 123456789017,
    name: 'nflx',
    status: 'fonds ESG',
    description: 'pas de commentaires'
  }
];
**/

  constructor(private httpClient: HttpClient) {
      this.getFondsFromServer();
  }

  emitFondsSubject() {
    this.fondsSubject.next(this.fondsVisuelArray.slice());
  }

  esgAll() {
    for(let fonds of this.fondsVisuelArray) {
      this.esg(fonds);
    }
  }

  unesgAll() {
    for(let fonds of this.fondsVisuelArray) {
      this.unesg(fonds);
    }
  }

  esg(fonds: FondsVisuel){
    fonds.esg = "true";
    this.emitFondsSubject();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    var isin : string = fonds.isin;

    this.httpClient
    .put('http://localhost:8000/api/update/esg/'+isin, {'esg':"true"}, httpOptions)
    .subscribe(
      (response) => {
        console.log('Fonds mis à jour !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  unesg(fonds: FondsVisuel){
    fonds.esg = "false";
    this.emitFondsSubject();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    var isin : string = fonds.isin;

    this.httpClient
    .put('http://localhost:8000/api/update/esg/'+isin, {'esg':"false"}, httpOptions)
    .subscribe(
      (response) => {
        console.log('Fonds mis à jour !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  saveComment(fonds: FondsVisuel, comment: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    var isin : string = fonds.isin;

    this.httpClient
    .put('http://localhost:8000/api/update/comment', {'isin':isin, 'comment': comment}, httpOptions)
    .subscribe(
      (response) => {
        console.log('Commentaire sauvegardé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );

    fonds.description = comment;
    this.emitFondsSubject();

    //this.getFondsFromServer();
  }

  getFondsByTicker(tickerSymbol: string) {
    const fonds = this.fondsVisuelArray.find(
      (s) => {
        return s.tickerSymbol === tickerSymbol;
      }
    );
    return fonds;
  }

  addFonds(fonds: Fonds) {
    this.saveFondsToServer(fonds);

    const nb : number = fonds.fondsLocaux.length;


    for(var i=0; i<nb;i++){
      var newFondsVisuel = new FondsVisuel(
        fonds.fondsLocaux[i].tickerSymbol,
        fonds.fondsLocaux[i].code,
        fonds.fondsLocaux[i].mic,
        fonds.isin,
        fonds.name,
        fonds.esg,
        fonds.description
      );

      this.fondsVisuelArray.push(newFondsVisuel);
    }

    this.emitFondsSubject();
    //this.getFondsFromServer();

    //on va immédiatement mettre le fonds à jour

    for(var i=0; i<nb;i++){
      const url = "http://localhost:8000/cotations/" + fonds.fondsLocaux[i].tickerSymbol;
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<any[]>(url,{headers})
        .subscribe(
          (response) => {
            console.log('Mise à jour ok.');
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
    }

  }

  saveFondsToServer(fonds: Fonds){
    //const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    this.httpClient
    .post('http://localhost:8000/api/addFonds', fonds, httpOptions)
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  getFondsFromServer() {
      const url = "http://localhost:8000/api/fondsList";
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<FondsVisuel[]>(url,{headers})
        .subscribe(
          (response) => {
            this.fondsVisuelArray = response;
            this.emitFondsSubject();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }


}
