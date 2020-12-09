import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/CONFIG';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserInformationsService {
  constructor(private http: HttpClient, private logService: LogService) { }
  url = CONFIG.service_url;


  async getIPAddress() {
    try {
      return await this.http.get('https://api.ipify.org/?format=json').toPromise();
    } catch (error) {
      if (error.status == 0) {
        return { "ip": "0.0.0.0" };
      }
      else {
        this.logService.error(error, "user-informations.service");
      }
    }
  }

  async addVisit(browser) {
    let ipJson;
    try {
      await this.getIPAddress().then(r => {
        ipJson = JSON.stringify(r);
        const params = {
          visitorBrowser: browser,
          visitorIp: JSON.parse(ipJson).ip,
          visitorLastVisit: new Date()
        };
        return this.http.post(this.url + "/newVisit", { params }).toPromise();
      });
    } catch (error) {
      console.log("STATUS:" + error);
      this.logService.error(error, "user-informations.service");
    }
  }

  getTotalVisits() {
    return this.http.get(this.url + "/totalVisits");
  }
}
