import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UserInformationsService } from 'src/app/services/user-informations.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { LoadingService } from './services/loading.service';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  constructor(public location: Location, private userInformationsService: UserInformationsService, private loadingService: LoadingService, private logService: LogService) {
    this.addVisit(window.navigator.userAgent);
  }
  addVisit(browser) {
    try {
      this.userInformationsService.addVisit(browser);
    } catch (error) {
      this.logService.error(error, "app.component");
    }
  }

  get isLoading() {
    return this.loadingService.isLoading;
  }
  set isLoading(boolean) {
    this.loadingService.isLoading = boolean;
  }
  title = 'JLD Philatelie';
}
