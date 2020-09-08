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
  basketList = [];
  mailLink;
  displayTimbreModal: boolean = false;
  displayEmptyBasket: boolean = false;
  displayDevisModal: boolean = false;
  displayBasketList: boolean = false;
  basketDevisList = '';

  selectedTimbre = new Timbre;
  constructor(private basketService: BasketService, private timbreService: TimbreService) { }

  getBasketList() {
    this.basketList = this.basketService.getBasket();
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
    this.getBasketList();
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
  copyInputMessage(inputElement) {
    inputElement.focus();
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    console.log('copié');
  };

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

  mailContruction() {
    let adresse = 'mailto:jld_philatelie@laposte.net';
    let sujet = '?subject=Devis%20avant%20commande';
    let corps = '&body=Liste%20des%20timbres%20demandés:';
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
    this.cleanAfterDevis();
  }

  cleanAfterDevis() {
    this.basketList.forEach(timbre => {
      try {
        this.timbreService.decrementTimbreQuantity(timbre.timbreId, timbre.quantite).subscribe(
          data => { this.deleteTimbreFromBasket(timbre); },
          error => { console.log(error); throw new Error(error); });
      } catch (error) {
        console.log(error);
      }
    });
    this.display = false;
    this.displayBasketList = false;
    this.displayDevisModal = false;
  }
}
