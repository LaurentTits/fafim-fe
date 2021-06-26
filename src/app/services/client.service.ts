import { Client } from '../models/Client.model';
import { BehaviorSubject, Subject, Subscription, Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class ClientService {


  private clients: Client[] = [];
  /*= [
    new Client(0, 'Tits', 'Laurent', {'date':'1988-07-11'}, 1, 3, 'laurent.tits@student.umons.ac.be', ['01/0203', '0487/231523'])
  ];**/
  clientSubject = new Subject<Client[]>();
  private authToken = "3>hL\\AK&$`,yc%Y8";



  constructor(private httpClient: HttpClient) {
    this.getClientsFromServer();
  }

  emitClients() {
    this.clientSubject.next(this.clients.slice());
  }

  addClient(client: Client) {
    this.saveClientToServer(client);
    this.clients.push(client);

    this.getClientsFromServer();
    this.emitClients();
  }

  getClientsFromServer() {
      const url = "http://localhost:8000/api/clientlist";
      const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

      this.httpClient
        .get<Client[]>(url,{headers})
        .subscribe(
          (response) => {
            this.clients = response;
            this.emitClients();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }

  deleteClient(client: Client){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    var id : number = client.id;

    this.httpClient
    .delete('http://localhost:8000/api/deleteClient/'+id, httpOptions)
    .subscribe(
      (response) => {
        console.log('Client supprimé !');
        this.getClientsFromServer();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
        this.getClientsFromServer();
      }
    );

    const clientIndexToRemove = this.clients.findIndex(
      (clientToRemove) => {
        if(clientToRemove === client){
          return true;
        }
        else{
          return false;
        }
      }
    );

    this.clients.splice(clientIndexToRemove, 1);
    this.emitClients();

  }

  saveClientToServer(client: Client){
    //const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-AUTH-TOKEN': this.authToken
      })
    };

    this.httpClient
    .post('http://localhost:8000/api/addClient', client, httpOptions)
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

}
