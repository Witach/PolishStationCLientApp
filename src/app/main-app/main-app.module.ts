import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {MainAppComponent} from './main-app/main-app.component';
import {MainAppRoutingModule} from './main-app-routing.module';
import {WidgetsModule} from '../widget/widgets.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FilterComponent} from './filter/filter.component';
import {StationListComponent} from './station-list/station-list.component';
import {MatListModule} from '@angular/material/list';
import {StationItemComponent} from './station-item/station-item.component';
import {FuelPricesComponent} from './fuel-prices/fuel-prices.component';
import {PriceFormatterPipe} from './pipes/price-formatter.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MapListPresentatorComponent} from './map-list-presentator/map-list-presentator.component';
import {DualPresentatorComponent} from './dual-presentator/dual-presentator.component';
import {DualPresentatorToggleComponent} from './dual-presentator-toggle/dual-presentator-toggle.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DualToggleEventService} from './dual-presentator-toggle/dual-toggle-event-service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptorInterceptor} from '../service/jwt-interceptor.interceptor';


@NgModule({
  declarations: [MainAppComponent,
    DashboardComponent,
    FilterComponent,
    StationListComponent,
    StationItemComponent,
    FuelPricesComponent,
    PriceFormatterPipe,
    MapListPresentatorComponent,
    DualPresentatorComponent,
    DualPresentatorToggleComponent
  ],
  providers: [
    DualToggleEventService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true }
  ],
  imports: [
    MainAppRoutingModule,
    CommonModule,
    SharedModule,
    WidgetsModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatButtonToggleModule,
    ScrollingModule,
  ]
})
export class MainAppModule { }
