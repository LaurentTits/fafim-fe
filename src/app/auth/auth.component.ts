import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import{ Router } from '@angular/router';

import { Subscription, Observable, throwError } from 'rxjs';
import { Client } from '../models/Client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authStatus: boolean = false;

  authSubscription: Subscription;

  clients: Client[];
  clientSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.clientSubscription = this.clientService.clientSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );
  }

  ngOnDestroy(): void{
  }

  onSignIn(username: string, password: string) {
    /*this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['fonds']);
      }
    );**/
    this.authService.signIn(username, password);

    this.authSubscription = this.authService.authSubject.subscribe(
      (isAuth: boolean) => {
        this.authStatus = isAuth;
        if(isAuth){
          this.router.navigate(['fonds']);
        }
        else{
          alert('Mauvais nom d\'utilisateur ou mot de passe.');
        }
        this.authSubscription.unsubscribe();
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
