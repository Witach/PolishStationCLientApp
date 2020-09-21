import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../common/shared.module';
import { MainAppComponent } from './main-app/main-app.component';
import {MainAppRoutingModule} from './main-app-routing.module';
import {WidgetsModule} from '../widget/widgets.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { StationListComponent } from './station-list/station-list.component';



@NgModule({
  declarations: [MainAppComponent, DashboardComponent, FilterComponent, StationListComponent],
  imports: [
    MainAppRoutingModule,
    CommonModule,
    SharedModule,
    WidgetsModule,
    MatSidenavModule ,
  ]
})
export class MainAppModule { }
