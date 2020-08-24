import { Component, OnInit } from '@angular/core';
import { TimbreService } from '../../services/timbre.service';
import { Timbre } from '../../models/timbre';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timbre-list',
  templateUrl: './timbre-list.component.html',
  styleUrls: ['./timbre-list.component.css']
})
export class TimbreListComponent implements OnInit {
  timbreList = [];
  filteredTimbreList = [];
  timbreStart;
  timbreEnd;
  timbreSearch;
  timbreCat;
  error;
  dispoFilter: Boolean;
  etatFilter;
  sortFilter;
  loading: Boolean;

  constructor(private timbreService: TimbreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = false;
    // Setup le rangement de la liste a num ascendant
    this.sortFilter = 'NumAsc';

    this.route.queryParams.subscribe(params => {
      this.timbreStart = params['start'];
      this.timbreEnd = params['end'];
      this.timbreSearch = params['search'];
      this.timbreCat = params['category'];
      if (this.timbreSearch) {
        this.getTimbreByNumber(this.timbreSearch);
      } else if (this.timbreStart && this.timbreEnd) {
        this.getTimbreRange(this.timbreStart, this.timbreEnd);
      } else if (this.timbreCat) {
        this.getTimbreCat(this.timbreCat);
      }
      else {
        this.error = 'On dirait que vous jouez avec l\'URL. Utilisez la barre de recherchee ou le menu latéral. ;)'
      }
    });
  }

  getAllTimbres() {
    this.loading = true;
    this.timbreService.getAllTimbres().subscribe(data => {
      this.timbreList = data as Timbre[];
      this.loading = false;
    });
  }

  getTimbreByNumber(number) {
    if (Number(number) && number % 1 === 0 && number > 0) {
      this.loading = true;
      this.timbreService.getTimbreByNumero(number).subscribe(data => {
        this.timbreList = data as Timbre[];
        if (this.timbreList.length === 0) {
          this.error = 'Le timbre n°' + number + ' n\'est pas enregistré sur ce site.';
        }
        this.loading = false;
      });
    } else {
      this.error = 'La recherche doit comporter un chiffre entier et positif.';
    }
  }

  get filteredList() {
    // Reset de la liste
    this.filteredTimbreList = this.timbreList;

    // Trier la liste
    switch (this.sortFilter) {
      case "NumDesc": {
        this.filteredTimbreList.sort(this.sortByNumDesc);
        break;
      }
      case "PriceAsc": {
        this.filteredTimbreList.sort(this.sortByPriceAsc);
        break;
      }
      case "PriceDesc": {
        this.filteredTimbreList.sort(this.sortByPriceDesc);
        break;
      }
      default: {
        this.filteredTimbreList.sort(this.sortByNumAsc);
        break;
      }
    }
    // Application des filtres selon état
    switch (this.etatFilter) {
      case "alt": {
        this.filteredTimbreList = this.timbreList.filter(timbre => timbre.etatTimbre === 'occas');
        break;
      }
      case "sg": {
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
    // Affichage de l'erreur si la liste est vide
    if (this.filteredTimbreList.length === 0) {
      this.error = "Pas de timbre disponible pour cette catégorie";
    }
    return this.filteredTimbreList;
  }


  getTimbreCat(cat) {
    try {
      this.loading = true;
      this.timbreService.getTimbresByCat(cat).subscribe(data => {
        this.timbreList = data as Timbre[];
        this.timbreList.sort(this.timbreService.sortByNumer);
        if (this.timbreList && this.timbreList != null && this.timbreList.length == 0) {
          this.error = 'Aucun timbre n\'existe pour cette catégorie';
        }
        this.loading = false;
      });

    } catch (error) {
      this.error = error;

    }
  }

  getTimbreRange(start, end) {
    this.loading = true;
    if ((Number(start) && Number(end)) && (start > 0 && end > 0) && (start % 1 === 0 && end % 1 === 0)) {

      try {
        this.timbreService.getTimbresByRange(start, end).subscribe(data => {
          this.timbreList = data as Timbre[];
          this.filteredTimbreList = this.timbreList;
          this.timbreList.sort(this.timbreService.sortByNumer);
          if (this.timbreList && this.timbreList != null && this.timbreList.length == 0) {
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

  sortByNumAsc(a, b) {
    return a.numeroTimbre - b.numeroTimbre;
  }
  sortByNumDesc(a, b) {
    return b.numeroTimbre - a.numeroTimbre;
  }
  sortByPriceAsc(a, b) {
    return a.prixTimbre - b.prixTimbre;
  }
  sortByPriceDesc(a, b) {
    return b.prixTimbre - a.prixTimbre;
  }

}
