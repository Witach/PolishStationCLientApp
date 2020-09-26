import {NgModule} from '@angular/core';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';

@NgModule({
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: []
})
export class CoreModule { }
