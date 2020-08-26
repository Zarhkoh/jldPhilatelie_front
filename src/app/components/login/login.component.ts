import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  constructor(private toastService: ToastService, private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/adminpanel']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [],
      pwd: []
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
    localStorage.setItem('token', data.token);
    this.toastService.showSuccess("Vous êtes maintenant connecté.");
    this.router.navigate(['/adminpanel']);
    // this.presentSuccessToast("Connexion réussie !");
  }

  handleError(error) {
    if (error.status == '403') {
      this.error = 'Combinaison email/mot de passe invalide.';
    } else {
      this.error = error.message;
    }
  }

}
