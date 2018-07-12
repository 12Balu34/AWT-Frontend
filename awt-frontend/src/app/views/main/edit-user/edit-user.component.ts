import {Component, Host, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../../validators/password-validation";
import {AuthService} from "../../../services/auth/auth.service";
import {MainComponent} from "../main.component";
import {User} from "../../../model/user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.editUserForm = this.formBuilder.group({
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

  private editUser() {

  }
}
