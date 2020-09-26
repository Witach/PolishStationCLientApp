import { NgModule } from '@angular/core';
import {BrandLogoComponent} from './navbar/brand-logo/brand-logo.component';
import {LoginNavbarComponent} from './navbar/login-navbar/login-navbar.component';
import {SharedModule} from '../common/shared.module';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [BrandLogoComponent, LoginNavbarComponent, NavbarComponent, SidenavComponent],
  exports: [BrandLogoComponent, LoginNavbarComponent, NavbarComponent, SidenavComponent],
    imports: [
        SharedModule,
        MatSidenavModule,
        MatListModule
    ]
})
export class WidgetsModule { }
