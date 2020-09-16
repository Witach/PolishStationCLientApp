import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginAppComponent} from './login-app/login-app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';

const routes: Routes = [
  {path: 'auth/register', component: RegisterFormComponent},
  { path: 'auth', component: LoginAppComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginFormComponent },
      { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' }
    ] },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
