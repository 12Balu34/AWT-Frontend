import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

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
    if (this.authService.getCurrentUser()==null) {
      this.authService.initializeGlobalUser()
        .subscribe(
          data => {
            this.user = this.authService.getCurrentUser();
          } ,
          error => console.log(error)
        )
      return;
    } else this.user = this.authService.getCurrentUser();
  }

}
