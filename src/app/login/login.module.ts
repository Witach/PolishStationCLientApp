import {NgModule} from '@angular/core';
import {SharedModule} from '../common/shared.module';
import {LoginFormComponent} from './login-form/login-form.component';
import {LoginAppComponent} from './login-app/login-app.component';
import {LoginRoutingModule} from './login-routing.module';
import {SignUpFormComponent} from './sign-up-form/sign-up-form.component';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';
import {ValidFormIconPipe} from './service/form-icon.pipe';
import {SuccessfulSignUpComponent} from './successful-sign-up/successful-sign-up.component';
import {WidgetsModule} from '../widget/widgets.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ResembleFormComponent } from './resemble-form/resemble-form.component';
import { ResembleConfirmComponent } from './resemble-confirm/resemble-confirm.component';
import { LoginTogglePresenterButtonComponent } from './login-toggle-presenter-button/login-toggle-presenter-button.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
    declarations: [
        LoginFormComponent,
        LoginAppComponent,
        SignUpFormComponent,
        SignInFormComponent,
        ValidFormIconPipe,
        SuccessfulSignUpComponent,
        ResembleFormComponent,
        ResembleConfirmComponent,
        LoginTogglePresenterButtonComponent,
        LandingPageComponent
    ],
    exports: [
        ValidFormIconPipe
    ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    WidgetsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
  ]
})
export class LoginModule { }
