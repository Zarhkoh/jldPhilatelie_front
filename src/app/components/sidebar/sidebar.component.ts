import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserInformationsService } from 'src/app/services/user-informations.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  limits = [
    { "start": 100, "end": 999 },
    { "start": 1000, "end": 1199 },
    { "start": 1200, "end": 1399 },
    { "start": 1400, "end": 1599 },
    { "start": 1600, "end": 1799 },
    { "start": 1800, "end": 1999 },
    { "start": 2000, "end": 2199 },
    { "start": 2200, "end": 2399 },
    { "start": 2400, "end": 2599 },
    { "start": 2600, "end": 2799 },
    { "start": 2800, "end": 2999 },
    { "start": 3000, "end": 3199 },
    { "start": 3200, "end": 4000 }
  ];
  totalVisits;

  constructor(public location: Location, private userInformationsService: UserInformationsService) {

  }

  ngOnInit(): void {
    this.getTotalVisits();
  }

  getTotalVisits() {
    this.userInformationsService.getTotalVisits().subscribe(data => this.totalVisits = data);
  }


}
