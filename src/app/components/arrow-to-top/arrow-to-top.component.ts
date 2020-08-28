import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-arrow-to-top',
  templateUrl: './arrow-to-top.component.html',
  styleUrls: ['./arrow-to-top.component.css']
})
export class ArrowToTopComponent implements OnInit {
  constructor() { }
  arrowDisplay: boolean;
  ngOnInit(): void {
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (scrollY < 170) {
      this.arrowDisplay = false;
    } else {
      this.arrowDisplay = true;
    }
  }

  arrowClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

}
