import { NgModule } from '@angular/core';
import {BrandLogoComponent} from './navbar/brand-logo/brand-logo.component';
import {LoginNavbarComponent} from './navbar/login-navbar/login-navbar.component';
import {SharedModule} from '../common/shared.module';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {SnackBarService} from './snack-bar.service';
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [BrandLogoComponent, LoginNavbarComponent, NavbarComponent, SidenavComponent],
  providers: [SnackBarService],
  exports: [BrandLogoComponent, LoginNavbarComponent, NavbarComponent, SidenavComponent],
    imports: [
        SharedModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule
    ]
})
export class WidgetsModule { }
