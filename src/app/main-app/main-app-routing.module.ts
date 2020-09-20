import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainAppComponent} from './main-app/main-app.component';

const routes: Routes = [
  { path: 'main', component: MainAppComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
