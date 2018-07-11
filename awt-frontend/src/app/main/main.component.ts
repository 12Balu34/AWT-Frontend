import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  private logout() {
    this.authService.logout();
    //make sure the user is logged out
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }
}
