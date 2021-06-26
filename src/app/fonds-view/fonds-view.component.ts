import { Component, OnInit, OnDestroy } from '@angular/core';
import { FondsService } from '../services/fonds.service';
import { BehaviorSubject, Subscription, Observable, Subject, throwError } from 'rxjs';
import { FondsVisuel } from '../models/FondsVisuel.model';

@Component({
  selector: 'app-fonds-view',
  templateUrl: './fonds-view.component.html',
  styleUrls: ['./fonds-view.component.css']
})
export class FondsViewComponent implements OnInit {

  lastUpdate = new Promise<Date>((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  fondsArray: FondsVisuel[] = [];
  fondsSubscription: Subscription;


  constructor(private fondsService: FondsService) {
  }

  ngOnInit() {
    this.fondsSubscription = this.fondsService.fondsSubject.subscribe(
      (fondsArray: FondsVisuel[]) => {
        this.fondsArray = fondsArray;
      }
    );

    this.fondsService.emitFondsSubject();

  }

  ngOnDestroy() {
    this.fondsSubscription.unsubscribe();
  }

  onEsgAll(){
    this.fondsService.esgAll();
  }

  onUnesgAll(){
    if(confirm('Êtes-vous sûr de vouloir vouloir retirer tous les labels de vos fonds ?')) {
      this.fondsService.unesgAll();
    }
    else {
    }
  }

}
