import { Portefeuille } from '../models/Portefeuille.model';
import { BehaviorSubject, Subject, Subscription, Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class PortefeuilleService {

  private portefeuilles: Portefeuille[] = [];

  portefeuilleSubject = new BehaviorSubject<Portefeuille[]>(this.portefeuilles);

  portefeuilleObservable = this.portefeuilleSubject.asObservable();
  private authToken = "3>hL\\AK&$`,yc%Y8";


  constructor(private httpClient: HttpClient) {
  }

  emitPortefeuilles() {
    this.portefeuilleSubject.next(this.portefeuilles.slice());
  }

  emitNothing(){
    this.portefeuilleSubject.next([]);
  }

  getPortefeuillesFromServer() {
      const url = "http://localhost:8000/api/portefeuilles";
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<Portefeuille[]>(url,{headers})
        .subscribe(
          (response) => {
            this.portefeuilles = response;
            this.emitPortefeuilles();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

}
