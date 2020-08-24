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

  sortByNumer(a, b) {
    return a.numeroTimbre - b.numeroTimbre;
  }
}
