import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { Client} from '../models/Client.model';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
      this.clientForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      birthDate: ['',Validators.required],
      sexe: ['',Validators.required],
      email: ['', [Validators.email, Validators.maxLength(50)] ],
      pub: ['4', Validators.required],
      phones: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    const formValue = this.clientForm.value;
    const newClient = new Client(
      0,
      formValue['firstName'],
      formValue['lastName'],
      { date : formValue['birthDate'] },
      formValue['sexe'],
      formValue['pub'],
      formValue['email'],
      formValue['phones'] ? formValue['phones'] : []
    );
    this.clientService.addClient(newClient);

    this.router.navigate(['/clients']);
  }

  getPhones(): FormArray {
      return this.clientForm.get('phones') as FormArray;
  }

  onAddPhone() {
    const newPhoneControl = this.formBuilder.control(null, Validators.required);
    this.getPhones().push(newPhoneControl);
  }


}
