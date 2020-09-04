import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timbre } from '../models/timbre';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  displayBasket: boolean = false;
  timbreList = [];
  constructor() {
    this.getBasket();
  }
  addTimbreToBasket(timbre) {
    let foundMatchInBasket;
    const savedTimbre = {
      "catTimbre": timbre.catTimbre,
      "numeroTimbre": timbre.numeroTimbre,
      "optionalInfos": timbre.optionalInfos,
      "etatTimbre": timbre.etatTimbre,
      "prixTimbre": timbre.prixTimbre,
      "imageTimbreUrl": timbre.imageTimbreUrl,
      "quantite": 1
    };
    foundMatchInBasket = this.timbreList.find(t => t.catTimbre + t.numeroTimbre + t.optionalInfos + t.etatTimbre == savedTimbre.catTimbre + savedTimbre.numeroTimbre + savedTimbre.optionalInfos + savedTimbre.etatTimbre);

    if (foundMatchInBasket) {
      console.log('"trouvé, +1"');
      this.timbreList[this.timbreList.indexOf(foundMatchInBasket)].quantite += 1;
    } else {
      console.log('pas trouvé, création');

      this.timbreList.push(savedTimbre);
    }
    this.refreshLocalStorageBasket();
  }

  getBasket() {
    this.timbreList = JSON.parse(localStorage.getItem('basket'));
    if (this.timbreList === null) {
      this.timbreList = [];
    }
    return (this.timbreList);
  }

  deleteTimbreFromBasket(timbre) {
    this.timbreList.splice(timbre, 1);
    this.refreshLocalStorageBasket();
  }

  emptyBasket() {
    this.timbreList = [];
    localStorage.removeItem('basket');
  }

  refreshLocalStorageBasket() {
    localStorage.setItem('basket', JSON.stringify(this.timbreList));
  }

  get totalArticlesNumber() {
    let numberArticles = 0;
    this.timbreList.forEach(timbre => {
      numberArticles += timbre.quantite;
    });
    return numberArticles;
  }

  adjustQuantity(timbre, operator) {
    if (operator === '-' && timbre.quantite > 1) {
      this.timbreList[this.timbreList.indexOf(timbre)].quantite -= 1;
    } else if (operator === '+' && timbre.quantite >= 1) {
      this.timbreList[this.timbreList.indexOf(timbre)].quantite += 1;
    }
    this.refreshLocalStorageBasket();
  }
}
