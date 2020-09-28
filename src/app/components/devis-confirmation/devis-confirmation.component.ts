import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timbre } from 'src/app/models/timbre';
import { BasketService } from 'src/app/services/basket.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-devis-confirmation',
  templateUrl: './devis-confirmation.component.html',
  styleUrls: ['./devis-confirmation.component.css']
})
export class DevisConfirmationComponent implements OnInit {

  displayTimbreModal: boolean = false;
  selectedTimbre = new Timbre;
  email = '';
  basketList = [];
  message = '';
  totalArticles = 0;
  addMessage: boolean = false;
  livraisons = [{ value: { type: 'ES', prix: 1.90, denomination: 'Envoi Simple - 1.90€' }, label: 'Envoi Simple - 1.90€' },
  { value: { type: 'LS', prix: 2.39, denomination: 'Lettre Suivie - 2.39€' }, label: 'Lettre Suivie - 2.39€' },
  { value: { type: 'ER', prix: 5.50, denomination: 'Envoi Recommandé - 5.50€' }, label: 'Envoi Recommandé - 5.50€' }];
  livraison;

  constructor(private basketService: BasketService, private loadingService: LoadingService, private router: Router) { }

  ngOnInit(): void {
    this.getBasketList();
    this.totalArticlesCalcul();
    this.basketService.displayBasket = false;
    this.livraison = this.livraisons[0].value;
  }

  getBasketList() {
    this.basketList = this.basketService.getBasket();
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
  }

  adjustQuantity(timbre, operator) {
    this.basketService.adjustQuantity(timbre, operator);
    this.getBasketList();
    this.totalArticlesCalcul();
  }

  deleteTimbreFromBasket(timbre) {
    try {
      this.basketService.deleteTimbreFromBasket(timbre);
      this.totalArticlesCalcul();
    } catch (error) {
      console.log(error);
    }
    this.getBasketList();
  }

  sendDevis() {
    try {
      this.loadingService.isLoading = true;
      // const envoi = this.livraisons[this.livraisons.findIndex(l => l.prix = this.livraison)];
      this.basketService.sendBasketToDevis(this.email, this.message, this.livraison).subscribe(data => { this.basketService.emptyBasket(); this.router.navigate(['/merci']) }, error => console.log(error));
    } catch (error) {
    }
  }
}
