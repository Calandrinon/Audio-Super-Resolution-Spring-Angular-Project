import { Component, OnInit } from '@angular/core';
import {LoginService} from "../authentication/service/login.service";
import {Router} from "@angular/router";
import {RegisterService} from "../authentication/service/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registrationFailed: boolean = false;
    recentRegistration: boolean = false;

    constructor(private registerService: RegisterService,
            private router: Router) { }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  register(username: string, email: string, password: string): void {
    console.log("Here is where the register should start...");
    this.registerService.saveNewAccount(username, email, password).subscribe(
        (response) => {
          console.log("In register component")
          console.log("Response:");
          console.log(response);
          if (response.body['id'] != null) {
            console.log("Response is positive.");
            this.registrationFailed = false;
            this.recentRegistration = true;
          } else {
              console.log("Response is negative.");
              this.registrationFailed = true;
          }
        }
    )
  }

}
