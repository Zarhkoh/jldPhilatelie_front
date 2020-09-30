import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/CONFIG';

@Injectable({
  providedIn: 'root'
})
export class UserInformationsService {
  constructor(private http: HttpClient) { }
  url = CONFIG.service_url;


  async getIPAddress() {
    return await this.http.get('https://api.ipify.org/?format=json').toPromise();
  }

  async addVisit(browser) {
    let ipJson;
    await this.getIPAddress().then(r => {
      ipJson = JSON.stringify(r);
      const params = {
        visitorBrowser: browser,
        visitorIp: JSON.parse(ipJson).ip,
        visitorLastVisit: new Date()
      };
      return this.http.post(this.url + "/newVisit", { params }).toPromise();
    });

  }

  getTotalVisits() {
    return this.http.get(this.url + "/totalVisits");
  }
}
