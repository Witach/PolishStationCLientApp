import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../widget/snack-bar.service';
import {first, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  loggingUser: FormGroup;
  isLoading = false;

  constructor(private formsBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: SnackBarService,
              private matSnackBar: MatSnackBar) {
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
      this.isLoading = true;
      this.authService.login(this.loggingUser.get('email').value, this.loggingUser.get('password').value)
        .pipe(
          first(),
          tap(user => this.authService.updateUserData(user))
        )
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/main', 'petrol-list']);
          },
          err => {
            this.isLoading = false;
            if (err.status === 401) {
              this.matSnackBar.open('Bad credentials', null, {duration: 1000, panelClass: ['polish-station-snack-bar']});
            } else {
              this.matSnackBar.open(err.message, null, {duration: 1000, panelClass: ['polish-station-snack-bar']});
            }
          }
        );
    }
  }

}
