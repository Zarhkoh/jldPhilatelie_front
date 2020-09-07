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
  displayTimbreModal: boolean = false;
  displayEmptyBasket: boolean = false;

  selectedTimbre = new Timbre;
  constructor(private basketService: BasketService) { }

  getBasketList() {
    this.basketList = this.basketService.getBasket();
  }

  deleteTimbreFromBasket(timbre) {
    this.basketService.deleteTimbreFromBasket(timbre);
  }

  emptyBasket() {
    this.basketService.emptyBasket();
    this.basketList = [];
    this.displayEmptyBasket = false;
  }
  adjustQuantity(timbre, operator) {
    this.basketService.adjustQuantity(timbre, operator);
  }

  get basketTotal() {
    let sum = 0;
    this.basketList.forEach(timbre => {
      sum += Number(timbre.prixTimbre * timbre.quantite);
    });
    return sum;
  }

  get basketItemsNumber() {
    return this.basketService.totalArticlesNumber;
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
  showTimbreImgDialog(timbre) {
    this.displayTimbreModal = true;
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
      numerosTimbre += timbre.quantite + 'x ';
      if (timbre.catTimbre !== 'classic') {
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
