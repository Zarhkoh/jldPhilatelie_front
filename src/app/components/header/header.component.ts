import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TimbreService } from 'src/app/services/timbre.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup
  constructor(private basketService: BasketService, public toastService: ToastService, public router: Router, public location: Location, private timbreService: TimbreService, private loginService: LoginService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      numero_timbre: [],
    });
  }

  logout() {
    if (this.loginService.logout()) {
      this.toastService.showSuccess("Vous êtes maintenant déconnecté.");
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

  displayBasket() {
    this.basketService.displayBasket = !this.basketService.displayBasket;
  }

  get basketItemNumber() {
    return this.basketService.timbreList.length;
  }
}
