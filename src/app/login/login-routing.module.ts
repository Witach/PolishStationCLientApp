import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginAppComponent} from './login-app/login-app.component';
import {SignUpFormComponent} from './sign-up-form/sign-up-form.component';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {SuccessfulSignUpComponent} from './successful-sign-up/successful-sign-up.component';
import {ResembleConfirmComponent} from './resemble-confirm/resemble-confirm.component';
import {ResembleFormComponent} from './resemble-form/resemble-form.component';

const routes: Routes = [
  { path: 'auth', component: LoginAppComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SignInFormComponent },
      { path: 'register', component: SignUpFormComponent },
      { path: 'successful-registration', component: SuccessfulSignUpComponent },
      { path: 'resemble-form', component: ResembleConfirmComponent },
      { path: 'resemble-reset/:jwt', component: ResembleFormComponent }
    ] },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
