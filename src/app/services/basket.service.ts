import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { TimbreService } from './timbre.service';
import { CONFIG } from 'src/CONFIG';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  url = CONFIG.service_url;

  displayBasket = false;
  timbreList = [];

  invokeFirstComponentFunction = new EventEmitter();
  subsBar: Subscription;

  constructor(private http: HttpClient, private timbreService: TimbreService) {
    this.checkBasketValidity();
    this.getBasket();
  }

  addTimbreToBasket(timbre): boolean {
    let foundMatchInBasket;
    try {
      const savedTimbre = {
        timbreId: timbre.timbreId,
        catTimbre: timbre.catTimbre,
        numeroTimbre: timbre.numeroTimbre,
        anneeCoinDate: timbre.anneeCoinDate,
        optionalInfos: timbre.optionalInfos,
        etatTimbre: timbre.etatTimbre,
        prixTimbre: timbre.prixTimbre,
        imageTimbreUrl: timbre.imageTimbreUrl,
        quantite: 1,
        tasType: timbre.tasType,
        maxQuantite: timbre.quantiteTimbre
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
    try {
      const actualLS = JSON.parse(localStorage.getItem('basket'));
      this.timbreList = actualLS.timbres;
    } catch (error) {
      this.timbreList = [];
    }
    return (this.timbreList);
  }

  deleteTimbreFromBasket(timbre) {
    let idx = this.timbreList.findIndex(t => t.timbreId === timbre.timbreId);
    this.timbreList.splice(idx, 1);
    this.invokeFirstComponentFunction.emit([timbre]);
    this.refreshLocalStorageBasket();
  }

  emptyBasket() {
    this.invokeFirstComponentFunction.emit(this.timbreList);
    this.timbreList = [];
    localStorage.removeItem('basket');
    this.displayBasket = false;
  }

  refreshLocalStorageBasket() {
    const lsList = { timbres: this.timbreList, expire: new Date().getTime() };
    localStorage.setItem('basket', JSON.stringify(lsList));
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
    return this.http.post(this.url + '/sendDevis', { params });
  }

  checkBasketValidity() {
    console.log('on check la validité du panier');
    if (localStorage.getItem('basket')) {
      const diffInHours = new Date().getTime() - JSON.parse(localStorage.getItem('basket')).expire;
      if (diffInHours > (2 * 1000 * 60 * 60)) {
        this.emptyBasket();
      }
    }
  }
}
