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

  getTimbresQty() {
    return this.http.get(this.url + '/timbresQty');
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

  getTimbresByRange(debut, fin, etat) {
    const params = {
      start: debut,
      end: fin,
      condition: etat
    };
    return this.http.get(this.url + "/timbresByRange", { params });
  }

  getTimbresByCat(timbreCat, timbreEtat) {
    const params = {
      categorie: timbreCat,
      condition: timbreEtat
    };
    return this.http.get(this.url + "/timbresByCat", { params });
  }

  addTimbre(newTimbre) {
    if (newTimbre.optionalInfos) {
    }
    const params = {
      newTimbre
    };
    return this.http.post(this.url + "/addTimbre", { params });
  }

  updateTimbre(newTimbre) {
    if (newTimbre.optionalInfos) {
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
    let aFormatted;
    let bFormatted;

    switch (String(a.numeroTimbre).length) {
      case 2:
        aFormatted = "00" + String(a.numeroTimbre);
        break;
      case 3:
        aFormatted = "0" + String(a.numeroTimbre);
      default:
        aFormatted = String(a.numeroTimbre);
        break;
    }

    switch (String(b.numeroTimbre).length) {
      case 2:
        bFormatted = "00" + String(b.numeroTimbre);
        break;
      case 3:
        bFormatted = "0" + String(b.numeroTimbre);
      default:
        bFormatted = String(b.numeroTimbre);
        break;
    }

    aFormatted = a.tasType + aFormatted;
    bFormatted = b.tasType + bFormatted;

    if (a.optionalInfos) {
      aFormatted += a.optionalInfos;
    }
    if (b.optionalInfos) {
      bFormatted += b.optionalInfos;
    }
    return aFormatted > bFormatted ? 1 : -1;
  }


  sortByNumDesc(a, b) {
    let aFormatted;
    let bFormatted;

    switch (String(a.numeroTimbre).length) {
      case 2:
        aFormatted = "00" + String(a.numeroTimbre);
        break;
      case 3:
        aFormatted = "0" + String(a.numeroTimbre);
      default:
        aFormatted = String(a.numeroTimbre);
        break;
    }

    switch (String(b.numeroTimbre).length) {
      case 2:
        bFormatted = "00" + String(b.numeroTimbre);
        break;
      case 3:
        bFormatted = "0" + String(b.numeroTimbre);
      default:
        bFormatted = String(b.numeroTimbre);
        break;
    }
    aFormatted = a.tasType + aFormatted;
    bFormatted = b.tasType + bFormatted;
    if (a.optionalInfos) {
      aFormatted += a.optionalInfos;
    }
    if (b.optionalInfos) {
      bFormatted += b.optionalInfos;
    }
    return aFormatted > bFormatted ? -1 : 1;
  }
  sortByPriceAsc(a, b) {
    return a.prixTimbre - b.prixTimbre;
  }
  sortByPriceDesc(a, b) {
    return b.prixTimbre - a.prixTimbre;
  }
}
