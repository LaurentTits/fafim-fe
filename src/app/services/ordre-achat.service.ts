import { OrdreAchat } from '../models/OrdreAchat.model';
import { Depense } from '../models/Depense.model';
import { BehaviorSubject, Subject, Subscription, Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class OrdreAchatService {

  private ordresAchat: OrdreAchat[] = [];

  ordresAchatSubject = new Subject<OrdreAchat[]>();

  private depenses: Depense[] = [];
  depensesSubject = new Subject<Depense[]>();

  private authToken = "3>hL\\AK&$`,yc%Y8";
  private apiAddOrdreAchat = 'http://localhost:8000/api/addOrdreAchat';


  constructor(private httpClient: HttpClient) {
  }

  emitOrdresAchat() {
    this.ordresAchatSubject.next(this.ordresAchat.slice());
  }

  emitDepenses() {
    this.depensesSubject.next(this.depenses.slice());
  }

  emitNothing(){
    this.ordresAchatSubject.next([]);
  }

  emitNoDepenses(){
    this.depensesSubject.next([]);
  }

  getOrdresAchatFromServer(id : number) {
      const url = "http://localhost:8000/api/clientOrders?id=" + id;
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<OrdreAchat[]>(url,{headers})
        .subscribe(
          (response) => {
            this.ordresAchat = response;
            this.emitOrdresAchat();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

  getDepensesFromServer(id : number) {
      const url = "http://localhost:8000/api/clientMontantParDevise?id=" + id;
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<Depense[]>(url,{headers})
        .subscribe(
          (response) => {
            this.depenses = response;
            this.emitDepenses();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

  addOrdreAchat(ordreAchat: OrdreAchat, idClient : number) {

    this.saveOrdreAchatToServer(ordreAchat);
    this.ordresAchat.push(ordreAchat);
    this.emitOrdresAchat();

    this.getOrdresAchatFromServer(idClient);
  }

  saveOrdreAchatToServer(ordreAchat: OrdreAchat){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    this.httpClient
    .post(this.apiAddOrdreAchat, ordreAchat, httpOptions)
    .subscribe(
      () => {
        console.log('Enregistrement de l\'ordre d\'achat terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

}
