import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timbre } from 'src/app/models/timbre';
import { BasketService } from 'src/app/services/basket.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-devis-confirmation',
  templateUrl: './devis-confirmation.component.html',
  styleUrls: ['./devis-confirmation.component.css']
})
export class DevisConfirmationComponent implements OnInit {

  displayTimbreModal: boolean = false;
  selectedTimbre = new Timbre;
  selectedTimbreNumber = '';
  email = '';
  basketList = [];
  message = '';
  totalArticles = 0;
  addMessage: boolean = false;
  livraisons = [{prix: 1.90, label: 'Envoi Simple' },
  { prix: 2.39, label: 'Lettre Suivie' },
  { prix: 5.50, label: 'Envoi Recommandé' }];
  livraison: number;
  constructor(private basketService: BasketService, private loadingService: LoadingService, private router: Router, private logger:LogService) { }

  ngOnInit(): void {
    this.getBasketList();
    this.totalArticlesCalcul();
    this.basketService.displayBasket = false;
    this.livraison = 1.90;
  }

  getBasketList() {
    try {
      this.basketList = this.basketService.getBasket();
    } catch (error) {
      this.logger.error(error,"devis-confirmation.component");
    }
  }

  totalArticlesCalcul() {
    this.totalArticles = 0;
    this.basketList.forEach(timbre => {
      this.totalArticles += Number(timbre.prixTimbre) * timbre.quantite;
    });
  }

  showTimbreImgDialog(timbre) {
    this.displayTimbreModal = true;
    this.selectedTimbre = timbre;
    this.selectedTimbreNumber = '';
    if(timbre.tasType){
      this.selectedTimbreNumber+=timbre.tasType;
    }
    this.selectedTimbreNumber+=timbre.numeroTimbre;
    if(timbre.etatTimbre=='occas'){
      this.selectedTimbreNumber+= '*';
    }
    if(timbre.etatTimbre=='sg'){
      this.selectedTimbreNumber+= 'SG';
    }
    if(timbre.optionalInfos){
      this.selectedTimbreNumber+= timbre.optionalInfos;
    }
    if(timbre.catTimbre=='cd'){
      this.selectedTimbreNumber+= "("+timbre.anneeCoinDate+')';
    }
  }

  adjustQuantity(timbre, operator) {
    try {
      this.basketService.adjustQuantity(timbre, operator);
    } catch (error) {
      this.logger.error(error,"devis-confirmation.component");

    }
    this.getBasketList();
    this.totalArticlesCalcul();
  }

  deleteTimbreFromBasket(timbre) {
    try {
      this.basketService.deleteTimbreFromBasket(timbre);
      this.totalArticlesCalcul();
    } catch (error) {
      this.logger.error(error,"devis-confirmation.component");
    }
    this.getBasketList();
  }

  sendDevis() {
    try {
      if (this.totalArticles === 0) {
        return alert('Vous ne pouvez pas envoyer une commande sans timbres dans le panier.');
      }
      if (this.email.length <= 10) {
        return alert('merci de rentrer une adresse mail valide. (ex: martin@gmail.com');
      }
      this.loadingService.isLoading = true;
      const envoi = this.livraisons[this.livraisons.findIndex(l => l.prix == this.livraison)];
      this.basketService.sendBasketToDevis(this.email, this.message, envoi).subscribe(data => { this.basketService.emptyBasket(); this.router.navigate(['/merci']) }, error => console.log(error));
    } catch (error) {
      this.logger.error(error,"devis-confirmation.component");
    }
  }

  get total() {
    return this.totalArticles + Number(this.livraison);
  }
}
