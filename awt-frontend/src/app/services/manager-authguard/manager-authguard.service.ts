import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthguardService implements CanActivate{
  role: string = localStorage.getItem('role');
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean{
    if (this.authService.isManager()) {
      return true;
    }
    else {
      this.router.navigateByUrl('/campaigns');
      return false;
    }
  }


}
