import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TimbreService {
  url = 'https://jld-philatelieapi.navillus.kim/';
  // url = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getAllTimbres() {
    return this.http.get(this.url + '/timbres');
  }

  getTimbreByNumero(numeroTimbre) {
    const params = {
      numero_timbre: numeroTimbre
    };
    return this.http.get(this.url + "/timbreByNumeroTimbre", { params });
  }

  getTimbreById(id) {
    const params = {
      numero_timbre: id
    };
    return this.http.get(this.url + "/timbreByIdTimbre", { params });
  }

  deleteTimbreById(id) {
    const params = {
      timbreId: id
    };
    return this.http.get(this.url + "/deleteTimbreById", { params });
  }

  getTimbresByRange(debut, fin) {
    const params = {
      start: debut,
      end: fin
    };
    return this.http.get(this.url + "/timbresByRange", { params });
  }

  getTimbresByCat(timbreCat) {
    const params = {
      categorie: timbreCat,
    };
    return this.http.get(this.url + "/timbresByCat", { params });
  }

  addTimbre(newTimbre) {
    const params = {
      newTimbre
    };
    return this.http.post(this.url + "/addTimbre", { params });
  }

  updateTimbre(newTimbre) {
    const params = {
      newTimbre
    };
    return this.http.post(this.url + "/updateTimbre", { params });
  }

  incrementTimbreQuantity(id, qty) {
    const params = {
      id_timbre: id,
      quantity: qty
    };
    return this.http.get(this.url + "/incrementTimbreQuantity", { params });
  }
  decrementTimbreQuantity(id, qty) {
    const params = {
      id_timbre: id,
      quantity: qty
    };
    return this.http.get(this.url + "/decrementTimbreQuantity", { params });
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
