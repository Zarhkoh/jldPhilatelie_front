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
  error;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [],
      pwd: [],
      pwdConf: [],
      prenom: ['Jean-Louis']
    });
  }

  checkPasswords() {
    if (this.registerForm.value.pwd == this.registerForm.value.pwdConf) {
      this.pwdMatch = true;
    } else {
      this.pwdMatch = false;
      this.error = 'Les mots de passe ne correspondent pas.';
    }
  }

  register() {
    if (!this.pwdMatch) {
      console.log("1er: " + this.registerForm.value.pwd, "2nd: " + this.registerForm.value.pwdConf);
      this.error = 'Les mots de passe ne correspondent pas.';

    } else if (this.registerForm) {
      try {
        this.loginService
          .register(this.registerForm.value)
          .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    }
  }

  handleSuccess(data) {
    console.log(data.token);
    localStorage.setItem('token', data.token);
    this.router.navigate(['/adminpanel']);
  }

  handleError(error) {
    console.error('problem: ', error);
    this.error = error.message;
  }

}
