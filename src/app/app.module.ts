import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MainAppModule} from './main-app/main-app.module';
import {SharedModule} from './common/shared.module';
import {LoginModule} from './login/login.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AppLoadService} from './service/app-load.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireMessagingModule} from "@angular/fire/messaging";

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

const firebaseConfig = {
  apiKey: 'AIzaSyDp8FbqVnJKur-9U4DX1G9tiT68FGCozyg',
  authDomain: 'polishstation-323f6.firebaseapp.com',
  projectId: 'polishstation-323f6',
  storageBucket: 'polishstation-323f6.appspot.com',
  messagingSenderId: '802499182121',
  appId: '1:802499182121:web:81540cc4ad8068d73f2638',
  measurementId: 'G-XLBJYQNV5M'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainAppModule,
    SharedModule,
    LoginModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ServiceWorkerModule.register('firebase-messaging-sw.js', { enabled: true }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
  ],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
