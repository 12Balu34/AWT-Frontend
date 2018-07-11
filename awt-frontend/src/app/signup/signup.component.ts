import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../validators/password-validation";
import {User} from "../model/user";
import {SignupService} from "../services/signup/signup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  message: string;
  messageClass: string;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );
  }

  private signup() {

    const user: User = {
      username: this.signupForm.get('username').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      role: this.signupForm.get('role').value
    };

    this.signupService.signup(user)
      .subscribe(
        data => {
          this.message = data.message;
          this.messageClass = 'alert alert-success';
          setTimeout(()=>this.router.navigateByUrl('/login'),2000);

        },
        error => {
          this.messageClass = 'alert alert-danger';
          this.message = error;
        }
      )

  }
}
