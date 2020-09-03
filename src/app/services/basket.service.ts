import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    const savedTimbre = {
      "catTimbre": timbre.catTimbre,
      "numeroTimbre": timbre.numeroTimbre,
      "optionalInfos": timbre.optionalInfos,
      "etatTimbre": timbre.etatTimbre,
      "prixTimbre": timbre.prixTimbre,
      "imageTimbreUrl": timbre.imageTimbreUrl
    };
    this.timbreList.push(savedTimbre);
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

}
