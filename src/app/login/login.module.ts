import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../common/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginAppComponent } from './login-app/login-app.component';
import {LoginRoutingModule} from './login-routing.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, LoginAppComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
