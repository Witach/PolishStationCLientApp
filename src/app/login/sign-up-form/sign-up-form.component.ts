import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  registringUser: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const {email, username, password, password: repeatPassword} = fieldsDefs;
    this.registringUser = this.formBuilder.group({email, username, password, repeatPassword}, this.repeatPasswordValidator);
  }

  repeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatedPassword = control.get('repeatPassword');
    return repeatedPassword === password ? {repeatedCorrectly: true} : null;
  }

}
