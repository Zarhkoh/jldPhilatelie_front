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
  timbreType;
  error;
  constructor(private timbreService: TimbreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.timbreStart = params['start'];
      this.timbreEnd = params['end'];
      this.timbreSearch = params['search'];
      this.timbreType = params['type'];
      if (this.timbreSearch) {
        console.log('CHANGEMENT SEEARCH: ' + this.timbreSearch);
        this.getTimbreByNumber(this.timbreSearch);
      } else if (this.timbreStart && this.timbreEnd) {
        console.log(this.timbreStart, this.timbreEnd);
        this.getTimbreRange(this.timbreStart, this.timbreEnd);
      } else if (this.timbreType) {
        console.log("cherche timbre par type " + this.timbreType);
        this.getTimbreType(this.timbreType);
      }
      else {
        this.error = 'On dirait que vous jouez avec l\'URL. Utilisez la barre de recherchee ou le menu latéral. ;)'
      }
    });
  }

  getAllTimbres() {
    this.timbreService.getAllTimbres().subscribe(data => this.timbreList = data as Timbre[]);
  }

  getTimbreByNumber(number) {
    if (Number(number) && number % 1 === 0 && number > 0) {
      console.log('timbreByNumberCalled');
      this.timbreService.getTimbreByNumero(number).subscribe(data => {
        this.timbreList = [];
        if (data != null) {
          this.timbreList.push(data);
        }
        if (this.timbreList && this.timbreList != null && this.timbreList.length == 0) {
          this.error = 'Le timbre n°' + number + ' n\'est pas enregistré sur ce site.';
        }
      });
    } else {
      console.log("SEARCH PARAM: ", number);
      this.error = 'La recherche doit comporter un chiffre entier et positif.';
    }
  }

  getTimbreType(type) {
    try {
      this.timbreService.getTimbresByType(type).subscribe(data => {
        this.timbreList = data as Timbre[];
        this.timbreList.sort(this.timbreService.sortByNumer);
        console.log(this.timbreList);
        if (this.timbreList && this.timbreList != null && this.timbreList.length == 0) {
          console.log("pas de timbre pour la catégorie " + type);
          this.error = 'Aucun timbre n\'existe pour cette catégorie';
        }
      });

    } catch (error) {
      console.log("ERROR TYPE: ", error);

      this.error = error;

    }
  }

  getTimbreRange(start, end) {
    console.log('timbreRangeCalled');
    if ((Number(start) && Number(end)) && (start > 0 && end > 0) && (start % 1 === 0 && end % 1 === 0)) {

      try {
        this.timbreService.getTimbresByRange(start, end).subscribe(data => {
          this.timbreList = data as Timbre[];
          this.timbreList.sort(this.timbreService.sortByNumer);
          if (this.timbreList && this.timbreList != null && this.timbreList.length == 0) {
            this.error = 'Aucun timbre n\'existe entre ' + start + ' et ' + end;
          }
        });
      } catch (e) {
        this.error = e;
      }
    } else {
      this.error = 'Les paramètres doivent être des chiffres entiers positifs.';
    }
  }
}
