import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainAppComponent} from './main-app/main-app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StationListComponent} from "./station-list/station-list.component";
import {StationItemComponent} from "./station-item/station-item.component";

const routes: Routes = [
  { path: 'main', component: MainAppComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'petrol-list', component: StationListComponent },
      { path: 'petrol-item', component: StationItemComponent },
    ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
