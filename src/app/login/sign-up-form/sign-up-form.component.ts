import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {noop} from 'rxjs';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  registringUser: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const {email, username, password, password: repeatPassword} = fieldsDefs;
    this.registringUser = this.formBuilder.group({email, username, password, repeatPassword}, this.repeatPasswordValidator);
  }

  repeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatedPassword = control.get('repeatPassword');
    return repeatedPassword === password ? {repeatedCorrectly: true} : null;
  }

  onSubmit() {
    if (this.registringUser.valid) {
      const email = this.registringUser.get('email').value;
      const password = this.registringUser.get('password').value;
      const username = this.registringUser.get('username').value;
      this.authService.register({email, password, username}).subscribe(
        () => this.router.navigate(['/main', '/sign-in']),
        noop
      );
    }
  }

}
