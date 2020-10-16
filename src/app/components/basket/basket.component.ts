import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Timbre } from 'src/app/models/timbre';
import { TimbreService } from 'src/app/services/timbre.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  mailLink;
  displayTimbreModal: boolean = false;
  displayEmptyBasket: boolean = false;
  displayDevisModal: boolean = false;
  displayBasketList: boolean = false;
  basketDevisList = '';

  selectedTimbre = new Timbre;
  constructor(private basketService: BasketService, private timbreService: TimbreService) { }

  get basketList() {
    return this.basketService.getBasket();
  }

  deleteTimbreFromBasket(timbre) {
    try {
      this.basketService.deleteTimbreFromBasket(timbre);
    } catch (error) {
      console.log(error);

    }
  }

  emptyBasket() {
    this.basketService.emptyBasket();
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
  }

  showTimbreImgDialog(timbre) {
    this.displayTimbreModal = true;
    this.selectedTimbre = timbre;
  }

  constructBasketList() {
    this.basketList.forEach((timbre, index, array) => {
      this.basketDevisList += `${timbre.quantite}x `;
      if (timbre.catTimbre !== 'classic') {
        this.basketDevisList += timbre.catTimbre + ' ';
      }
      this.basketDevisList += `${timbre.numeroTimbre}`;
      if (timbre.optionalInfos) {
        this.basketDevisList += timbre.optionalInfos;
      }
      if (timbre.etatTimbre === 'occas') {
        this.basketDevisList += '*';
      } else if (timbre.etatTimbre === 'sg') {
        this.basketDevisList += 'sg';
      }
      if (index !== array.length - 1) {
        this.basketDevisList += ', ';
      } else {
        this.basketDevisList += '.';
      }
    });
    this.basketDevisList += ` \nQuantité totale: ${this.basketList.length} timbres.`;
    this.showBasketList();
  }

  showBasketList() {
    this.displayDevisModal = false;
    this.display = false;
    this.displayBasketList = true;
  }
}
