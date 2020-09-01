import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CONFIG } from './../CONFIG';
import * as sha1 from 'js-sha1';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  url = 'https://api.cloudinary.com/v1_1/zarhkoh/image/upload';
  constructor(private http: HttpClient) { }

  public upload(image, name) {
    let actualTimestamp = new Date().getTime() / 1000;
    let signatureCreated = sha1('public_id=' + name + '&timestamp=' + actualTimestamp + CONFIG.secret_api);
    const params = {
      file: image,
      api_key: CONFIG.api_key,
      timestamp: actualTimestamp,
      public_id: name,
      signature: signatureCreated
    };
    return this.http.post(this.url, params).toPromise();
  }

}
