import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TimbreService {
  url = 'http://jld-philatelieapi.navillus.kim/';

  constructor(private http: HttpClient) { }

  getAllTimbres() {
    console.log('call service timbre getalltimbres()');
    return this.http.get(this.url + '/timbres');
  }

  getTimbreByNumero(numeroTimbre) {
    const params = {
      numero_timbre: numeroTimbre
    };
    return this.http.get(this.url + "/timbreByNumeroTimbre", { params });
  }

  deleteTimbreByNumero(numeroTimbre) {
    const params = {
      numero_timbre: numeroTimbre
    };
    return this.http.get(this.url + "/deleteTimbreByNumeroTimbre", { params });
  }

  getTimbresByRange(debut, fin) {
    const params = {
      start: debut,
      end: fin
    };
    return this.http.get(this.url + "/timbresByRange", { params });
  }

  getTimbresByType(timbreType) {
    const params = {
      type: timbreType,
    };
    return this.http.get(this.url + "/timbresByType", { params });
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
