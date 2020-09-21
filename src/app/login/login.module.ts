import {NgModule} from '@angular/core';
import {SharedModule} from '../common/shared.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {LoginAppComponent} from './login-app/login-app.component';
import {LoginRoutingModule} from './login-routing.module';
import {RegisterFormComponent} from './register-form/register-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { ValidFormIconPipe } from './service/form-icon.pipe';
import { SuccessfulSignUpComponent } from './successful-sign-up/successful-sign-up.component';
import {WidgetsModule} from "../widget/widgets.module";
import {MatSidenavModule} from "@angular/material/sidenav";



@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    LoginAppComponent,
    RegisterFormComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ValidFormIconPipe,
    SuccessfulSignUpComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    WidgetsModule,
    MatSidenavModule,
  ]
})
export class LoginModule { }
