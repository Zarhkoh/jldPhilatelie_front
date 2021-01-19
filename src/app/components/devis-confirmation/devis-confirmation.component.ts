import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timbre } from 'src/app/models/timbre';
import { BasketService } from 'src/app/services/basket.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LogService } from 'src/app/services/log.service';
import { DomSanitizer } from "@angular/platform-browser"
import { SecurityContext } from "@angular/core";

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
  livraisons = [];
  livraison: number;
  constructor(private sanitizer: DomSanitizer, private basketService: BasketService, private loadingService: LoadingService, private livraisonService: LivraisonService, private router: Router, private logger: LogService) { }

  ngOnInit(): void {
    this.getBasketList();
    this.totalArticlesCalcul();
    this.getLivraisons();
    this.basketService.displayBasket = false;
  }

  getBasketList() {
    try {
      this.basketList = this.basketService.getBasket();
    } catch (error) {
      this.logger.error(error,"devis-confirmation.component");
    }
  }

  getLivraisons() {
    try {
      this.livraisonService.getAllLivraisons().subscribe(data => {
        this.livraisons = data as [];
        this.livraison = this.livraisons[0].prixLivraison;
      })
    } catch (error) {
      this.logger.error(error, "home.component");
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
      const envoi = this.livraisons[this.livraisons.findIndex(l => l.prixLivraison == this.livraison)];
      this.message = this.sanitizer.sanitize(SecurityContext.HTML, this.message);
      this.basketService.sendBasketToDevis(this.email, this.message, envoi).subscribe(data => { this.basketService.emptyBasket(); this.router.navigate(['/merci']) }, error => console.log(error));
    } catch (error) {
      this.logger.error(error,"devis-confirmation.component");
    }
  }

  get total() {
    return this.totalArticles + Number(this.livraison);
  }
}
