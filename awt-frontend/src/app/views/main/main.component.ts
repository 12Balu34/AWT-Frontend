import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  private logout() {
    this.authService.logout();
    //make sure the user is logged out
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  private getCurrentUser() {
    this.authService.getCurrentUser()
      .subscribe(
        data => {
          this.user = new User(data.username, data.email, data.password, data.roles[0].name);
          console.log(JSON.stringify(this.user));
        } ,
        error => console.log(error)
      )
  }
}
