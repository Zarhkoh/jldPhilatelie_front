import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Timbre } from 'src/app/models/timbre';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketList = [];
  mailLink;
  displayModal: boolean = false;
  selectedTimbre = new Timbre;
  constructor(private basketService: BasketService) { }

  getBasketList() {
    console.log("basket updated");
    this.basketList = this.basketService.getBasket();
  }

  deleteTimbreFromBasket(timbre) {
    this.basketService.deleteTimbreFromBasket(timbre);
  }
  emptyBasket() {
    this.basketService.emptyBasket();
    this.basketList = [];
  }

  get basketTotal() {
    let sum = 0;
    this.basketList.forEach(timbre => {
      sum += Number(timbre.prixTimbre);
    });
    return sum;
  }

  get display(): boolean {
    return this.basketService.displayBasket;
  }

  set display(value: boolean) {
    this.basketService.displayBasket = !this.display;
  }
  ngOnInit(): void {
    this.getBasketList();
  }
  showDialog(timbre) {
    this.displayModal = true;
    this.selectedTimbre = timbre;
  }

  mailContructionTest() {
    let adresse = 'mailto:jld_philatelie@laposte.net';
    let sujet = '?subject=Devis%20avant%20commande';
    let corps = '&body=Liste%20des%20timbres%20demandés:'
    let numerosTimbre = '';
    let totalTimbre = '%0DNombre%20total:%20' + this.basketList.length + '%20timbre';
    if (this.basketList.length > 1) {
      totalTimbre += 's';
    }
    let message = '.%0D%0D%5BMessage%20optionnel%5D';
    this.basketList.forEach((timbre, index, array) => {
      if (timbre.catTimbre != 'classic') {
        numerosTimbre += timbre.catTimbre + " "
      }
      numerosTimbre += timbre.numeroTimbre;
      if (timbre.optionalInfos) {
        numerosTimbre += timbre.optionalInfos;
      }
      if (timbre.etatTimbre === 'occas') {
        numerosTimbre += '*';
      } else if (timbre.etatTimbre === 'sg') {
        numerosTimbre += 'sg';
      }
      if (index !== array.length - 1) {
        numerosTimbre += ', ';
      } else {
        numerosTimbre += '.';
      }
    });
    window.location.href = adresse + sujet + corps + numerosTimbre + totalTimbre + message;
  }
}
