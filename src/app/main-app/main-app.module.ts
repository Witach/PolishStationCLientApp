import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../common/shared.module';
import { MainAppComponent } from './main-app/main-app.component';
import {MainAppRoutingModule} from './main-app-routing.module';



@NgModule({
  declarations: [MainAppComponent],
  imports: [
    MainAppRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class MainAppModule { }
