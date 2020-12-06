import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from '../../widget/snack-bar.service';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-resemble-form',
  templateUrl: './resemble-form.component.html',
  styleUrls: ['./resemble-form.component.scss']
})
export class ResembleFormComponent implements OnInit {

  registringUser: FormGroup;
  isLoading = false;
  jwt = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: SnackBarService, private matSnackBar: MatSnackBar, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const {email, password, password: repeatPassword} = fieldsDefs;
    this.registringUser = this.formBuilder.group({email, password, repeatPassword}, this.repeatPasswordValidator);
    this.activatedRoute.paramMap.subscribe(param => {
      this.jwt = param.get('jwt');
    });
  }

  repeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatedPassword = control.get('repeatPassword');
    return repeatedPassword === password ? {repeatedCorrectly: true} : null;
  }

  onSubmit() {
    if (this.registringUser.valid) {
      this.isLoading = true;
      const email = this.registringUser.get('email').value;
      const password = this.registringUser.get('password').value;
      this.authService.updatePassword(email, this.jwt , { email, password, username: 'asdasd'}).subscribe(
        () => {
          this.isLoading = false;
          this.matSnackBar.open('Successful password change', null, {duration: 1000, panelClass: ['polish-station-snack-bar']});
          this.router.navigate(['/auth', 'login']);
        },
        err => {
          this.isLoading = false;
          this.snackBar.openSnackBar(err);
        }
      );
    }
  }
}
