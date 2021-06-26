import { Component, OnInit } from '@angular/core';
import { Portefeuille } from '../models/Portefeuille.model';
import { OrdreAchat } from '../models/OrdreAchat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PortefeuilleService } from '../services/portefeuille.service';
import { OrdreAchatService } from '../services/ordre-achat.service';
import { Subscription} from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-ordre-achat',
  templateUrl: './new-ordre-achat.component.html',
  styleUrls: ['./new-ordre-achat.component.css']
})
export class NewOrdreAchatComponent implements OnInit {

  portefeuilles: Portefeuille[];

  portefeuilleSubscription: Subscription;

  idClient: number;

  ordreAchatForm: FormGroup;

  constructor(private portefeuilleService: PortefeuilleService,
              private ordreAchatService: OrdreAchatService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.idClient = this.route.snapshot.params['idClient'];
    this.portefeuilleService.getPortefeuillesFromServer();

    this.portefeuilleSubscription = this.portefeuilleService.portefeuilleObservable.subscribe(
      (portefeuilles: Portefeuille[]) => {
        this.portefeuilles = portefeuilles;
      }
    );
    this.initForm();
  }

  initForm() {
      this.ordreAchatForm = this.formBuilder.group({
      portefeuille: ['', [Validators.required]],
      montant: ['', [Validators.required]],
      devise: ['',Validators.required],
      orderDate: ['',Validators.required],
    });
  }

  ngOnDestroy(): void{
    this.portefeuilleSubscription.unsubscribe();
  }

  onSubmitForm(){
    const formValue = this.ordreAchatForm.value;
    const newOrdreAchat = new OrdreAchat(
      0,
      { date : formValue['orderDate'] },
      formValue['montant'],
      formValue['portefeuille'],
      formValue['devise'],
      this.idClient
    );
    this.ordreAchatService.addOrdreAchat(newOrdreAchat, this.idClient);

    this.router.navigate(['/clients/ordresAchat/'+this.idClient]);

  }

}
