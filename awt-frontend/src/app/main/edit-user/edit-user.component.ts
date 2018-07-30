import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/user";
import {UpdateUser} from "../../model/update-user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: User;
  isReadonly: boolean = true;
  message: string;
  messageClass: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.initializeGlobalUser()
      .subscribe(
        data => {
          this.user = this.authService.getCurrentUser();
          this.createForm();
        },
        error => console.log(error)
      )
  }

  private createForm() {
    this.editUserForm = this.formBuilder.group({
        username: [this.user.username, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }

  private editUser() {
    const updateUser: UpdateUser = {
      username: this.editUserForm.get('username').value,
      email: this.editUserForm.get('email').value,
      password: this.editUserForm.get('password').value,
    };

    this.authService.updateUser(updateUser)
      .subscribe(
        data => {
          this.message= 'Update Successful. This page will automatically refresh to apply the changes';
          this.messageClass = 'alert alert-success';
          setTimeout(()=>this.reloadPage(), 2000);
        },
        error=> {
          this.message = error.error.message;
          this.messageClass = 'alert alert-danger'
        }
      )
  }

  private toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }

  private reloadPage() {
    location.reload();
  }

}
