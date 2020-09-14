import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UserInformationsService } from 'src/app/services/user-informations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public location: Location, private userInformationsService: UserInformationsService) {
    this.addVisit(window.navigator.userAgent);
  }
  addVisit(browser) {
    console.log("appComponent: ", browser);
    this.userInformationsService.addVisit(browser);
  }
  title = 'JLD Philatelie';
}
