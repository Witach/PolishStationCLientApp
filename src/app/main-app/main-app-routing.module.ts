import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainAppComponent} from './main-app/main-app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StationItemComponent} from './station-item/station-item.component';
import {AuthGuard} from '../service/auth.guard';
import {DualPresentatorComponent} from './dual-presentator/dual-presentator.component';

const routes: Routes = [
  { path: 'main', component: MainAppComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'petrol-list', component: DualPresentatorComponent },
      { path: 'petrol-item', component: StationItemComponent },
    ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
