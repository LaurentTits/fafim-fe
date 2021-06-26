import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../models/Client.model';
import { BehaviorSubject, Subscription, Observable, Subject, throwError } from 'rxjs';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  clients: Client[];
  clientSubscription: Subscription;

  private url = "http://localhost:8000/api/clientlist";
  private authToken = "3>hL\\AK&$`,yc%Y8";

  color = "lightgreen";

  constructor(private httpClient: HttpClient,
              private clientService: ClientService,
              private router: Router) {

     }

  ngOnInit() {
    this.clientSubscription = this.clientService.clientSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );

    this.clientService.emitClients();
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  onVisualiseAchats(idClient: number){
    this.router.navigate(['clients/ordresAchat/'+idClient]);
  }

  onDeleteClient(client: Client){
    if(confirm('Êtes-vous sûr de vouloir supprimer le client ?')) {
      this.clientService.deleteClient(client);
    }
    else {
    }
  }

}
