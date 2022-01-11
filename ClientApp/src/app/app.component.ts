import { Component } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  currentUser: User;
  searchMenu: FormGroup;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) =>{
        this.currentUser = x;
      }
    );
  }

  ngOnInit() {
 
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
