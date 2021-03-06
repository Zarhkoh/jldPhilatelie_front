import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { CONFIG } from 'src/CONFIG';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = CONFIG.service_url;

  constructor(private http: HttpClient) { }

  login(login: User) {
    return this.http.post(`${this.url}/login`, login);
  }

  logout() {
    localStorage.removeItem('token');
    return !localStorage.getItem('token');
  }

  register(account) {
    return this.http.post(`${this.url}/register`, account);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token != null) {
      return true;
    }
    return false;
  }
}
