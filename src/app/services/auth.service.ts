import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, Subscription, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserInfo } from '../models/UserInfo.model';

@Injectable()

export class AuthService {

  isAuth :boolean = false;
  private authToken = "3>hL\\AK&$`,yc%Y8";

  authSubject = new Subject<boolean>();
  authObservable = this.authSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  emitAuth() {
    this.authSubject.next(this.isAuth);
  }

  signIn(user: string, password: string) {
    /*return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 1
        );
      }
    );**/

    const url = "http://localhost:8000/api/user?username=" + user + "&plainPassword=" + password;
    const headers = new HttpHeaders().set("X-AUTH-TOKEN", this.authToken);

    this.httpClient
      .get<UserInfo>(url,{headers})
      .subscribe(
        (response) => {
          this.isAuth = response['validLogin'];
          this.emitAuth();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

  }

  signOut() {
    this.isAuth = false;
  }
}
