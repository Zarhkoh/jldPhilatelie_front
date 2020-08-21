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
  timbreStart;
  timbreEnd;
  timbreSearch;
  timbreCat;
  error;
  dispoFilter: Boolean;
  neufFilter: Boolean;
  occasFilter: Boolean;
  loading: Boolean;
  constructor(private timbreService: TimbreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = false;
    this.dispoFilter = false;
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
        this.timbreList = [];
        if (data != null) {
          this.timbreList.push(data);
        }
        if (this.timbreList && this.timbreList != null && this.timbreList.length == 0) {
          this.error = 'Le timbre n°' + number + ' n\'est pas enregistré sur ce site.';
        }
        this.loading = false;
      });
    } else {
      this.error = 'La recherche doit comporter un chiffre entier et positif.';
    }
  }

  get filteredlist() {
    return this.timbreList.filter(x => x.age > 18);
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
}
