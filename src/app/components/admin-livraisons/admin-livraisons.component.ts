import { Component, OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';
import { Livraison } from 'src/app/models/livraison';
import { ToastService } from 'src/app/services/toast.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-admin-livraisons',
  templateUrl: './admin-livraisons.component.html',
  styleUrls: ['./admin-livraisons.component.css']
})
export class AdminLivraisonsComponent implements OnInit {

  livraisons = [];
  newLivraison;
  livraisonForEdition: Livraison;
  idLivraisonEdition;
  
  constructor(private livraisonService: LivraisonService, private toastService: ToastService, private logger: LogService) { }

  ngOnInit(): void {
    this.getLivraisons();
  }

  getLivraisons(){
    try {
      this.livraisonService.getAllLivraisons().subscribe(data => {
        this.livraisons = data as Livraison[];
      })
    } catch (error) {
      this.logger.error(error,"admin-livraisons.component");
      this.toastService.showDanger(error);
    }

  }

  addLivraison(){
    try {
      this.livraisonService.addLivraison(this.newLivraison);
    } catch (error) {
      this.logger.error(error,"admin-livraisons.component");
      this.toastService.showDanger(error);
    }
  }

  allowLivraisonEdition(livraison){
    this.idLivraisonEdition = livraison.livraisonId;
    this.livraisonForEdition =  livraison as Livraison;
  }

  updateLivraison(livraison) {
    try {
      this.livraisonService.updateLivraison(livraison).subscribe(data => {
        livraison.dateEditionLivraison = new Date();
        this.livraisons.splice(this.livraisons.indexOf(this.livraisons.find(x => x.livraisonId == this.livraisonForEdition.livraisonId)), 1, this.livraisonForEdition);
        this.idLivraisonEdition = 0;
        this.toastService.showSuccess(livraison.nomLivraison + ' mis à jour.');
      })
    } catch (error) {
      this.logger.error(error,"admin-livraisons.component");
      this.toastService.showDanger(error);
    }
  }

  deleteLivraisonById(livraison){
    try {
      this.livraisonService.deleteLivraisonById(livraison.livraisonId).subscribe(data => {
        if (data === 1) {
          this.livraisons.splice(this.livraisons.indexOf(livraison), 1);
          this.toastService.showSuccess(`${livraison.nomLivraison} supprimé`);
        }
          });
    } catch (error) {
      this.logger.error(error,"admin-livraisons.component");
      this.toastService.showDanger(error);
    }

  }

  abortEdition() {
    this.idLivraisonEdition = 0;
  }
}
