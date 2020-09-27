import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';
import {AuthService} from '../../service/auth.service';
import {noop} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  loggingUser: FormGroup;

  constructor(private formsBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    const {email, password} = fieldsDefs;
    this.loggingUser = this.formsBuilder.group({
      email,
      password
    });
  }

  onSubmit() {
    if (this.loggingUser.valid) {
      this.authService.login(this.loggingUser.get('email').value, this.loggingUser.get('password').value)
        .subscribe(
          () => this.router.navigate(['/main', 'dashboard']),
          noop
        );
    }
  }

}
