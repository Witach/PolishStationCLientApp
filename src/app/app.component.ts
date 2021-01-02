import {Component, OnInit} from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {AuthService} from './service/auth.service';
import {first, mergeMapTo} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AngularFireMessaging} from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'polish-station-app';
  readonly VAPID_KEY = 'BLI61op6id8t4Ycxf0qPZmyykx57LOF5uG7e3_Dh-eGqAwZfaEdc0YwQzj2I_ieL8AMmIeLeI_xA_hJ2kDw4PYc';
  a: PushSubscription;

  constructor(updates: SwUpdate, private authService: AuthService, private router: Router, private afMessaging: AngularFireMessaging, private swPush: SwPush) {
    updates.available.subscribe(x => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    this.afMessaging.requestPermission.subscribe(
      messaging => this.afMessaging.messages.subscribe() ,
    );
    this.authService.currentUserSubject.pipe(
      first()
    ).subscribe(user => {
      if (user) {
        this.router.navigate(['/main', 'petrol-list']);
      } else {
        this.router.navigate(['/auth', 'landing-page']);
      }
    });
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_KEY
    });
    self.addEventListener('fetch', function(event) {
      // @ts-ignore
      return event.respondWith(
        // @ts-ignore
        caches.match(event.request)
          .then(function(response) {
            // @ts-ignore
            const requestToCache = event.request.clone();

            return fetch(requestToCache).then().catch(error => {
              // Check if the user is offline first and is trying to navigate to a web page
              // @ts-ignore
              if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
                // Return the offline page
                return caches.match('/assets/offline-page.html');
              }
            });
          })
      );
    });
  }
}
