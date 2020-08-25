import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  limits = [
    { "start": 100, "end": 1000 },
    { "start": 1001, "end": 1200 },
    { "start": 1201, "end": 1400 },
    { "start": 1401, "end": 1600 },
    { "start": 1601, "end": 1800 },
    { "start": 1801, "end": 2000 },
    { "start": 2001, "end": 2200 },
    { "start": 2201, "end": 2400 },
    { "start": 2401, "end": 2600 },
    { "start": 2601, "end": 2800 },
    { "start": 2801, "end": 3000 },
    { "start": 3001, "end": 3200 },
    { "start": 3201, "end": 4000 }
  ];

  constructor(public location: Location) {

  }

  ngOnInit(): void {
  }

}
