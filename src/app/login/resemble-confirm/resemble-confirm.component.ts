import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {fieldsDefs} from '../../fields-definitions/fields-definitions';

@Component({
  selector: 'app-resemble-confirm',
  templateUrl: './resemble-confirm.component.html',
  styleUrls: ['./resemble-confirm.component.scss']
})
export class ResembleConfirmComponent implements OnInit {
  loggingUser: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const {email} = fieldsDefs;
    this.loggingUser = this.formBuilder.group({
      email
    });
  }

  onSubmit() {
    if (this.loggingUser.valid) {
      this.isLoading = true;
      this.authService.resemblePassword(this.loggingUser.get('email').value)
        .pipe(
          first(),
        )
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/auth', 'successful-registration']);
          },
          err => {
            this.isLoading = false;
            if (err.status === 401) {
              this.snackBar.open('Bad credentials', null, {duration: 1000, panelClass: ['polish-station-snack-bar']});
            } else {
              this.snackBar.open(err.message, null, {duration: 1000, panelClass: ['polish-station-snack-bar']});
            }
          }
        );
    }
  }

}
