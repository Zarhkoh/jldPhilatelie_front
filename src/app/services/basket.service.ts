import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimbreService } from './timbre.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  // url = 'https://jld-philatelieapi.navillus.kim/';
  url = 'http://localhost:3000';

  displayBasket: boolean = false;
  timbreList = [];
  constructor(private http: HttpClient, private timbreService: TimbreService) {
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
        let idx = this.timbreList.findIndex(t => t.timbreId === foundMatchInBasket.timbreId);
        this.timbreList[idx].quantite += 1;
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
    let idx = this.timbreList.findIndex(t => t.timbreId === timbre.timbreId);
    this.timbreList.splice(idx, 1);
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
      let idx = this.timbreList.findIndex(t => t.timbreId === timbre.timbreId);
      this.timbreList[idx].quantite -= 1;
    } else if (operator === 'plus' && timbre.quantite >= 1) {
      let idx = this.timbreList.findIndex(t => t.timbreId === timbre.timbreId);
      this.timbreList[idx].quantite += 1;
    }
    this.refreshLocalStorageBasket();
  }

  sendBasketToDevis(mail, message, livraison) {
    console.log('mail:' + mail, 'message' + message, 'livraison:' + JSON.stringify(livraison));
    const params = {
      email: mail,
      optionalMessage: message,
      timbres: this.timbreList,
      envoi: livraison
    };
    return this.http.post(this.url + "/sendDevis", { params });
  }
}
