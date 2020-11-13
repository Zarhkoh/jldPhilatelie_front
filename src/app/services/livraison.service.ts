import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/CONFIG';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  url = CONFIG.service_url;

  constructor(private http: HttpClient) { }

  getAllLivraisons() {
    return this.http.get(this.url + '/livraisons');
  }

  deleteLivraisonById(id) {
    const params = {
      livraisonId: id
    };
    return this.http.get(this.url + "/deleteLivraisonById", { params });
  }

  addLivraison(newLivraison) {
    const params = {
      newLivraison
    };
    return this.http.post(this.url + "/addLivraison", { params });
  }
  
  updateLivraison(newLivraison) {
    const params = {
      newLivraison
    };
    return this.http.post(this.url + "/updateLivraison", { params });
  }

}
