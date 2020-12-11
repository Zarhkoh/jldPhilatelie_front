import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/CONFIG';


@Injectable({
  providedIn: 'root'
})
export class TimbreService {
  url = CONFIG.service_url;


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
    if (newTimbre.optionalInfos) {
      newTimbre.optionalInfos = newTimbre.optionalInfos.toUpperCase();
    }
    const params = {
      newTimbre
    };
    return this.http.post(this.url + "/addTimbre", { params });
  }

  updateTimbre(newTimbre) {
    if (newTimbre.optionalInfos) {
      newTimbre.optionalInfos = newTimbre.optionalInfos.toUpperCase();
    }
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
    let aFormatted = String(a.tasType + a.numeroTimbre);
    let bFormatted = String(b.tasType + b.numeroTimbre);
    if (a.optionalInfos) {
      aFormatted += a.optionalInfos;
    }
    if (b.optionalInfos) {
      bFormatted += b.optionalInfos;
    }
    console.log(aFormatted, bFormatted);
    return aFormatted > bFormatted ? 1 : -1;
  }
  sortByNumDesc(a, b) {
    let aFormatted = String(a.tasType + a.numeroTimbre);
    let bFormatted = String(b.tasType + b.numeroTimbre);
    if (a.optionalInfos) {
      aFormatted += a.optionalInfos;
    }
    if (b.optionalInfos) {
      bFormatted += b.optionalInfos;
    }
    console.log(aFormatted, bFormatted);
    return aFormatted > bFormatted ? -1 : 1;
  }
  sortByPriceAsc(a, b) {
    return a.prixTimbre - b.prixTimbre;
  }
  sortByPriceDesc(a, b) {
    return b.prixTimbre - a.prixTimbre;
  }
}
