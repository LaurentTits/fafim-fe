import { Component, OnInit } from '@angular/core';
import { OrdreAchat } from '../models/OrdreAchat.model';
import {Depense } from '../models/Depense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdreAchatService } from '../services/ordre-achat.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-ordre-achat',
  templateUrl: './ordre-achat.component.html',
  styleUrls: ['./ordre-achat.component.css']
})
export class OrdreAchatComponent implements OnInit {

  ordresAchat: OrdreAchat[];
  ordreAchatSubscription: Subscription;

  depenses: Depense[];
  depenseSubscription: Subscription;

  idClient: number;

  constructor(private ordreAchatService: OrdreAchatService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.params['idClient'];

    this.ordreAchatService.getOrdresAchatFromServer(this.idClient);
    this.ordreAchatService.getDepensesFromServer(this.idClient);

    this.ordreAchatSubscription = this.ordreAchatService.ordresAchatSubject.subscribe(
      (ordresAchat: OrdreAchat[]) => {
        this.ordresAchat = ordresAchat;
      }
    );

    this.depenseSubscription = this.ordreAchatService.depensesSubject.subscribe(
      (depenses: Depense[]) => {
        this.depenses = depenses;
      }
    );
  }

  ngOnDestroy(): void{
    this.ordreAchatService.emitNothing();
    this.ordreAchatSubscription.unsubscribe();

    this.ordreAchatService.emitNoDepenses();
    this.depenseSubscription.unsubscribe();
  }

  centsToDecimal(montant: string){
    var result : number = 0;
    result = Number(montant)/100;
    return result;
  }

  onNewOA(){
    this.router.navigate(['new-ordre-achat/'+this.idClient]);
  }

  onBack(){
    this.router.navigate(['clients']);
  }

}
