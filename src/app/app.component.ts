import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'polish-station-app';


  constructor(updates: SwUpdate) {
    updates.available.subscribe(x => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    self.addEventListener('fetch', function(event) {
      // @ts-ignore
      return event.respondWith(
        // @ts-ignore
        caches.match(event.request)
          .then(function(response) {
            // @ts-ignore
            let requestToCache = event.request.clone();

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
