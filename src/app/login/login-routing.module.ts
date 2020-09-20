import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginAppComponent} from './login-app/login-app.component';
import {SignUpFormComponent} from './sign-up-form/sign-up-form.component';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {SuccessfulSignUpComponent} from './successful-sign-up/successful-sign-up.component';

const routes: Routes = [
  { path: 'auth', component: LoginAppComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SignInFormComponent },
      { path: 'register', component: SignUpFormComponent },
      { path: 'successful-registration', component: SuccessfulSignUpComponent },
    ] },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
