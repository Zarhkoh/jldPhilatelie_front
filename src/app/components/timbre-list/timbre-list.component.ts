import { Component, OnInit } from '@angular/core';
import { TimbreService } from '../../services/timbre.service';
import { Timbre } from '../../models/timbre';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-timbre-list',
  templateUrl: './timbre-list.component.html',
  styleUrls: ['./timbre-list.component.css']
})
export class TimbreListComponent implements OnInit {
  display = false;
  selectedTimbre = new Timbre();
  selectedTimbreNumber = '';
  timbreList = [];
  filteredTimbreList = [];
  basketList = [];
  timbreStart;
  timbreEnd;
  timbreSearch;
  timbreCat;
  error;
  dispoFilter: boolean;
  etatFilter;
  sortFilter;
  loading: boolean;
  basketConfirmation;
  constructor(private basketService: BasketService, private timbreService: TimbreService, private route: ActivatedRoute, private logger:LogService) {
  }

  ngOnInit(): void {
    if (this.basketService.subsBar === undefined) {
      try {
        this.basketService.subsBar = this.basketService.
        invokeFirstComponentFunction.subscribe((basketLine: string) => {
          this.releaseTimbreDeletedFromBasket(basketLine);
        });
      } catch (error) {
        this.logger.error(error,"timbre-list.component");
      }
    }
    // affiche ou non le gif de chargement
    this.loading = false;
    // Setup le rangement de la liste a num ascendant
    this.sortFilter = 'NumAsc';
    // récupère les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.timbreStart = params.start;
      this.timbreEnd = params.end;
      this.timbreSearch = params.search;
      this.timbreCat = params.category;
      if (this.timbreSearch) {
        this.getTimbreByNumber(this.timbreSearch);
      } else if (this.timbreStart && this.timbreEnd) {
        this.getTimbreRange(this.timbreStart, this.timbreEnd);
      } else if (this.timbreCat) {
        this.getTimbreCat(this.timbreCat);
      }
      else {
        this.error = 'On dirait que vous jouez avec l\'URL. Utilisez la barre de recherche ou le menu latéral. ;)';
      }
    });
  }

  adjustQtyWithBasket(): void {
    this.basketList.forEach(element => {
      try {
        this.timbreList.find(t => t.timbreId === element.timbreId).quantiteTimbre -= element.quantite;

      } catch (error) {
        
      }
    });
  }

  releaseTimbreDeletedFromBasket(basketLine) {
    try {
      basketLine.forEach(element => {
        this.timbreList.find(t => t.timbreId === element.timbreId).quantiteTimbre += element.quantite;
      });
    } catch (error) {
    }
  }

  getAllTimbres(): void {
    this.loading = true;
    try {
      this.timbreService.getAllTimbres().subscribe(data => {
        this.timbreList = data as Timbre[];
        this.loading = false;
      });
    } catch (error) {
      this.logger.error(error,"timbre-list.component");
    }

  }

  getTimbreByNumber(num: any): void {
    if (Number(num) && num % 1 === 0 && num > 0) {
      this.loading = true;
      try {
        this.timbreService.getTimbreByNumero(num).subscribe(data => {
          this.timbreList = data as Timbre[];
          if (this.timbreList.length === 0) {
            this.error = 'Le timbre n°' + num + ' n\'est pas disponible sur ce site.';
          }
          this.loading = false;
        });
      } catch (error) {
        this.logger.error(error,"timbre-list.component");
      }

    } else {
      this.error = 'La recherche doit comporter un chiffre entier et positif.';
    }
  }

  get filteredList(): Array<any> {
    // Reset de la liste
    this.filteredTimbreList = this.timbreList;

    // Trier la liste
    switch (this.sortFilter) {
      case 'NumDesc': {
        this.filteredTimbreList.sort(this.timbreService.sortByNumDesc);
        break;
      }
      case 'PriceAsc': {
        this.filteredTimbreList.sort(this.timbreService.sortByPriceAsc);
        break;
      }
      case 'PriceDesc': {
        this.filteredTimbreList.sort(this.timbreService.sortByPriceDesc);
        break;
      }
      default: {
        this.filteredTimbreList.sort(this.timbreService.sortByNumAsc);
        break;
      }
    }
    // Application des filtres selon état
    switch (this.etatFilter) {
      case 'alt': {
        this.filteredTimbreList = this.timbreList.filter(timbre => timbre.etatTimbre === 'occas');
        break;
      }
      case 'sg': {
        this.filteredTimbreList = this.timbreList.filter(timbre => timbre.etatTimbre === 'sg');
        break;
      }
      default: {
        break;
      }
    }
    // Application du filtre de quantité
    if (this.dispoFilter) {
      this.filteredTimbreList = this.filteredTimbreList.filter(timbre => timbre.quantiteTimbre > 0);
    }
    return this.filteredTimbreList;
  }

  getTimbreCat(cat): void {
    try {
      this.loading = true;
      this.timbreService.getTimbresByCat(cat).subscribe(data => {
        this.timbreList = data as Timbre[];
        this.adjustQtyWithBasket();
        if (this.timbreList && this.timbreList != null && this.timbreList.length === 0) {
          this.error = 'Aucun timbre n\'existe pour cette catégorie';
        }
        this.loading = false;
      });

    } catch (error) {
      this.logger.error(error,"timbre-list.component");
      this.error = error;

    }
  }

  getTimbreRange(start, end): void {
    this.loading = true;
    if ((Number(start) && Number(end)) && (start > 0 && end > 0) && (start % 1 === 0 && end % 1 === 0)) {
      try {
        this.timbreService.getTimbresByRange(start, end).subscribe(data => {
          this.timbreList = data as Timbre[];
          this.adjustQtyWithBasket();
          this.filteredTimbreList = this.timbreList;
          this.filteredTimbreList.sort(this.timbreService.sortByNumAsc);
          if (this.timbreList && this.timbreList != null && this.timbreList.length === 0) {
            this.error = 'Aucun timbre n\'existe entre ' + start + ' et ' + end;
          }
          this.loading = false;
        });
      } catch (e) {
        this.error = e;
      }
    } else {
      this.error = 'Les paramètres doivent être des chiffres entiers positifs.';
    }
  }
  showDialog(timbre): void {
    this.basketConfirmation = false,
      this.display = true;
    this.selectedTimbre = timbre as Timbre;
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

  addToBasket(timbre): void {
    if (timbre.quantiteTimbre === 0) {
      throw new Error('000');
    }
    else {
      try {
        this.basketService.addTimbreToBasket(timbre);
        this.timbreList[this.timbreList.indexOf(timbre)].quantiteTimbre -= 1;
        this.display = false;
        this.basketService.displayBasket = true;
      } catch (error) {
      }
      this.displayBasketConfirmation();
    }
  }

  displayBasketConfirmation(): void {
    this.basketConfirmation = true;
    this.basketList = this.basketService.timbreList;
  }

}
