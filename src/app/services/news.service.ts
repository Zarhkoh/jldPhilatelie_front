import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/CONFIG';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = CONFIG.service_url;

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(this.url + '/getNews');
  }

  updateNews(newNews) {
    const params = {
      newNews
    };
    return this.http.post(this.url + "/editNews", {params});
  }
}
