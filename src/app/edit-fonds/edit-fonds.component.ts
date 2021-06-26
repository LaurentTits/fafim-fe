import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { FondsService } from '../services/fonds.service';
import{ Router } from '@angular/router';
import { Fonds} from '../models/Fonds.model';
import { FondsLocal } from '../models/FondsLocal.model';

@Component({
  selector: 'app-edit-fonds',
  templateUrl: './edit-fonds.component.html',
  styleUrls: ['./edit-fonds.component.css']
})
export class EditFondsComponent implements OnInit {

  fondsForm: FormGroup;
  esgStatus = 'false';

  constructor(private formBuilder: FormBuilder,
              private fondsService: FondsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
      this.fondsForm = this.formBuilder.group({
      isin: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      esg: ['false', Validators.required],
      description: [''],
      fondsLocaux: this.formBuilder.array([])
    });
  }


  onSubmit() {
    const formValue = this.fondsForm.value;
    console.log(formValue);

    const isin = formValue['isin'];
    const name = formValue['name'];
    const esg = formValue['esg'];
    const description = formValue['description'];

    const nb : number = this.fondsLocaux.length;
    var fondsLocauxAdded: FondsLocal[] = [];

    for(var i: number=0;i<nb;i++){
      var formFondsValue = this.getFondsLocalForm(i).value;

      fondsLocauxAdded[i] = new FondsLocal(
        formFondsValue['tickerSymbol'],
        isin,
        formFondsValue['devise'],
        formFondsValue['mic']
      );

      console.log(formFondsValue);
    }

    const newFonds = new Fonds(
      isin,
      name,
      esg,
      description,
      fondsLocauxAdded
    );

    this.fondsService.addFonds(newFonds);
    this.router.navigate(['/fonds']);
  }

  get fondsLocaux() {
      return this.fondsForm.controls['fondsLocaux'] as FormArray;
  }

  onAddFondsLocal() {
    const newFondsLocalForm = this.formBuilder.group({
      tickerSymbol : ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      mic : ['XNAS', Validators.required],
      devise : ['USD', Validators.required]
    });

    this.fondsLocaux.push(newFondsLocalForm);
  }

  onDeleteFondsLocal(fondsLocalIndex : number){
    this.fondsLocaux.removeAt(fondsLocalIndex);
  }

  getFondsLocalForm(i: number) {
    return this.fondsLocaux.at(i) as FormGroup;
  }


}
