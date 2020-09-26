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
import {MatListModule} from "@angular/material/list";
import { StationItemComponent } from './station-item/station-item.component';
import { FuelPricesComponent } from './fuel-prices/fuel-prices.component';
import { PriceFormatterPipe } from './pipes/price-formatter.pipe';
import {MatChipsModule} from "@angular/material/chips";



@NgModule({
  declarations: [MainAppComponent,
    DashboardComponent,
    FilterComponent,
    StationListComponent,
    StationItemComponent,
    FuelPricesComponent,
    PriceFormatterPipe
  ],
  imports: [
    MainAppRoutingModule,
    CommonModule,
    SharedModule,
    WidgetsModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
  ]
})
export class MainAppModule { }
