import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TimbreService } from 'src/app/services/timbre.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup
  constructor(public router: Router, public location: Location, private timbreService: TimbreService, private loginService: LoginService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      numero_timbre: [],
    });
  }

  logout() {
    if (this.loginService.logout()) {
      this.router.navigate(['/']);
    }
  }
  isAuth() {
    return this.loginService.isAuthenticated();
  }

  searchTimbre() {
    if (this.searchForm != null) {
      this.router.navigate(['/timbres'], { queryParams: { search: this.searchForm.value.numero_timbre } });
    } else {
    }
  }

}
