import { Component, OnInit } from '@angular/core';
import { TimbreService } from 'src/app/services/timbre.service';
import { Timbre } from 'src/app/models/timbre';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
      type: ['neuf'],
      anneeCoinDate: [],
      optionalInfos: []
    });
  }

  getAllTimbres() {
    this.timbreService.getAllTimbres().subscribe(data => {
      this.timbreList = data as Timbre[];
    });

  }

  addTimbre() {
    console.log("ajout du timbre:", this.timbreForm.value);
    this.timbreService.addTimbre(this.timbreForm.value).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  deleteTimbreByNumero(timbre) {
    console.log("on delete " + timbre + "de la bdd");
    this.timbreService.deleteTimbreByNumero(timbre.numeroTimbre).subscribe(data => {
      if (data === 1) {
        this.timbreList.splice(this.timbreList.indexOf(timbre), 1);
      }
    });
  }

  changeTimbreQte(timbre, operation) {
    if (operation === "plus") {
      console.log("+1 sur ", timbre.numeroTimbre);
      timbre.quantiteTimbre += 1;
    } else if (operation === "minus") {
      console.log("-1 sur ", timbre.numeroTimbre);
      timbre.quantiteTimbre -= 1;
    }
    this.updateTimbre(timbre);
  }

  updateTimbre(timbre) {
    console.log(timbre);
    this.timbreService.updateTimbre(timbre).subscribe(data => console.log("RETOUR: ", data));
  }
  // EN FAIRE UN PIPE
  sortListByTimbreNumber() {
    this.timbreList.sort(this.timbreService.sortByNumer);
  }

}
