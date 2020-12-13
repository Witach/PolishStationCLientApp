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
import {LayoutService} from '../service/layout.service';
import { AdvancedFilterComponent } from './advanced-filter/advanced-filter.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import { PetrolStationDetailsComponent } from './petrol-station-details/petrol-station-details.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import { CreateStationComponent } from './create-station/create-station.component';
import {LoginModule} from "../login/login.module";
import { EditPetrolStaionComponent } from './edit-petrol-staion/edit-petrol-staion.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PolishStationStatsComponent } from './polish-station-stats/polish-station-stats.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { RanksComponent } from './ranks/ranks.component';
import { LovedStationComponent } from './loved-station/loved-station.component';
import { LovedListComponent } from './loved-list/loved-list.component';


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
    DualPresentatorToggleComponent,
    AdvancedFilterComponent,
    PetrolStationDetailsComponent,
    CreateStationComponent,
    EditPetrolStaionComponent,
    UserProfileComponent,
    PolishStationStatsComponent,
    RanksComponent,
    LovedStationComponent,
    LovedListComponent,
  ],
  providers: [
    DualToggleEventService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    LayoutService,
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
    MatRadioModule,
    MatSliderModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    LoginModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
  ]
})
export class MainAppModule { }
