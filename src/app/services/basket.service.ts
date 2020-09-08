import { Injectable } from '@angular/core';
import { TimbreService } from './timbre.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  displayBasket: boolean = false;
  timbreList = [];
  constructor(private timbreService: TimbreService) {
    this.getBasket();
  }
  addTimbreToBasket(timbre) {
    let foundMatchInBasket;
    try {
      const savedTimbre = {
        "timbreId": timbre.timbreId,
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
        this.timbreList[this.timbreList.indexOf(foundMatchInBasket)].quantite += 1;
      } else {
        this.timbreList.push(savedTimbre);
      }
      this.refreshLocalStorageBasket();
    } catch (error) {
      return error;
    }
    return true;

  }

  getBasket() {
    this.timbreList = JSON.parse(localStorage.getItem('basket'));
    if (this.timbreList === null) {
      this.timbreList = [];
    }
    return (this.timbreList);
  }

  deleteTimbreFromBasket(timbre) {
    this.timbreList.splice(this.timbreList.indexOf(timbre), 1);
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
    if (operator === 'minus' && timbre.quantite > 1) {
      this.timbreList[this.timbreList.indexOf(timbre)].quantite -= 1;
    } else if (operator === 'plus' && timbre.quantite >= 1) {
      this.timbreList[this.timbreList.indexOf(timbre)].quantite += 1;
    }
    this.refreshLocalStorageBasket();
  }
}
