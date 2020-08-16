import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/adminPanel']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['test@gmail.com'],
      pwd: ['Azerty1234']
    });
  }

  login() {
    if (this.loginForm) {
      this.loginService
        .login(this.loginForm.value)
        .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
    }
  }

  handleSuccess(data) {
    console.log(data.token);
    localStorage.setItem('token', data.token);
    this.router.navigate(['/adminPanel']);
    // this.presentSuccessToast("Connexion réussie !");
  }

  handleError(error) {
    // this.presentErrorToast("Identifiants incorrects!");
    console.error('Identifiant inccorrect', error);
  }

}
