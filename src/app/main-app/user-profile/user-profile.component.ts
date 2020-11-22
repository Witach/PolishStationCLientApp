import { Component, OnInit } from '@angular/core';
import {AppUserDTO, AppUserPostDto, AppUserStatsDTO} from "../../../api-models/api-models";
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {fieldsDefs} from "../../fields-definitions/fields-definitions";
import {AuthService} from "../../service/auth.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  editedUser: FormGroup;

  uiserId: number;

  userStats: AppUserStatsDTO;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    const {username, password, password: repeatPassword} = fieldsDefs;
    this.editedUser = this.formBuilder.group({username, password, repeatPassword}, this.repeatPasswordValidator);
    this.authService.getUserData().pipe(
     tap((appUser) => this.loadUserStats(appUser.id))
    ).subscribe(appUser => {
      this.editedUser.controls.username.setValue(appUser.username);
      this.uiserId = appUser.id;
    });
  }

  repeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatedPassword = control.get('repeatPassword');
    return repeatedPassword === password ? {repeatedCorrectly: true} : null;
  }

  onSubmit() {
    let isSthValid = false;
    const appUserPostDTO: AppUserPostDto = {email: null, username: null, password: null};
    if (this.editedUser.controls.username.valid) {
      isSthValid = true;
      appUserPostDTO.username = this.editedUser.controls.username.value;
    }
    if (this.editedUser.controls.password.valid) {
      isSthValid = true;
      appUserPostDTO.password = this.editedUser.controls.password.value;
    }
    if (isSthValid) {
      this.authService.updateUser(this.uiserId, appUserPostDTO).subscribe();
    }
  }

  wasChangedAndValid() {
    return !Object.keys(this.editedUser.controls)
      .map(control => this.editedUser.controls[control].valid)
      .some(validity => validity);
  }

  private loadUserStats(id: number) {
    this.authService.getUserStats(id).subscribe(appUserStats => this.userStats = appUserStats);
  }
}
