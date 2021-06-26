import { Component, OnInit, OnDestroy } from '@angular/core';
import { FondsService } from './services/fonds.service';
import { Observable, interval, Subscription } from 'rxjs';
import { Router, DefaultUrlSerializer, UrlTree } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FAFIM';
  logoPath = '.\\assets\\images\\logoFAFIM.jpg';

  seconds : number = 0;
  counterSubscription: Subscription;

  public curAddress: string = "";

  constructor(private fondsService: FondsService, private router: Router) {
  }

  ngOnInit() {
    const counter = interval(1000);

    this.counterSubscription = counter.subscribe(
      (value) => {
        this.seconds = value;
      },
      (error) => {
        console.log('Une erreur est survenue ! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
    this.curAddress = this.router.url;
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

  getCurAddress() : string{
    var tree : UrlTree = this.router.parseUrl(this.router.url);
    this.curAddress = tree.root.children['primary'].segments.map(it => it.path).join('/');;
    return this.curAddress;
  }

  getAbout() : string{
    this.curAddress = this.getCurAddress();
    return this.curAddress + "#About";
  }

}
