import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  loggingUser: FormGroup;

  constructor(private formsBuilder: FormBuilder) { }

  ngOnInit(): void {
    const {email, password} = fieldsDefs;
    this.loggingUser = this.formsBuilder.group({
      email,
      password
    });
  }

  onSubmit() {}

}
