import { Component, OnInit } from '@angular/core';
import { TimbreService } from 'src/app/services/timbre.service';
import { Timbre } from 'src/app/models/timbre';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  timbreList = [];
  test;
  timbreForm: FormGroup;
  constructor(private timbreService: TimbreService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllTimbres();
    this.timbreForm = this.formBuilder.group({
      numero: [],
      prix: [],
      quantite: [],
      image: [],
      categorie: [],
      etat: ['neuf'],
      anneeCoinDate: [],
      optionalInfos: [],
      tasType: []
    });
  }

  getAllTimbres() {
    this.timbreService.getAllTimbres().subscribe(data => {
      this.timbreList = data as Timbre[];
    });

  }

  addTimbre() {
    this.timbreService.addTimbre(this.timbreForm.value).subscribe(data => {
      this.ngOnInit();
    });
  }

  deleteTimbreByNumero(timbre) {
    this.timbreService.deleteTimbreByNumero(timbre.numeroTimbre).subscribe(data => {
      if (data === 1) {
        this.timbreList.splice(this.timbreList.indexOf(timbre), 1);
      }
    });
  }

  changeTimbreQte(timbre, operation) {
    if (operation === "plus") {
      timbre.quantiteTimbre += 1;
    } else if (operation === "minus") {
      timbre.quantiteTimbre -= 1;
    }
    this.updateTimbre(timbre);
  }

  updateTimbre(timbre) {
    this.timbreService.updateTimbre(timbre).subscribe(data => console.log("timbre update"));
  }
  // EN FAIRE UN PIPE
  sortListByTimbreNumber() {
    this.timbreList.sort(this.timbreService.sortByNumer);
  }

  setCat(cat) {
    this.timbreForm.controls['categorie'].setValue(cat);
  }
}
