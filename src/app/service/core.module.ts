import {NgModule} from '@angular/core';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {StorageService} from './storage.service';

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    StorageService
  ],
  bootstrap: []
})
export class CoreModule { }
