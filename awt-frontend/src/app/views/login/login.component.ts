import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  message: string;
  messageClass: string;

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

    login() {

    const userCredentials = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };


    this.authService.login(userCredentials)
      .subscribe(
        data=> {
          this.authService.setAccessToken(data.tokenType + ' ' + data.accessToken);
          this.messageClass = 'alert alert-success';
          this.message = 'Login successful';
          this.router.navigateByUrl('/campaigns');
        },
        error => {
          this.messageClass = 'alert alert-danger';
          this.message = error;
        }
      )
  };
}
