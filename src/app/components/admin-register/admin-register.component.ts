import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {


  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
  }
  registerForm: FormGroup;
  pwdMatch;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [],
      pwd: [],
      pwdConf: [],
      prenom: ['Jean-Louis']
    });
  }

  checkPasswords() {
    if (this.registerForm.value.pwd === this.registerForm.value.pwdConf) {
      this.pwdMatch = true;
    } else {
      this.pwdMatch = false;
    }
  }

  register() {
    console.log("OK: " + this.registerForm + "PWDMATCH: " + this.pwdMatch);
    if (this.registerForm && this.pwdMatch) {
      this.loginService
        .register(this.registerForm.value)
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
