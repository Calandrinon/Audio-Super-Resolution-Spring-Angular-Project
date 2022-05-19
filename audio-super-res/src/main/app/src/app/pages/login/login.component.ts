import { Component, OnInit, OnDestroy } from '@angular/core';
import {LoginService} from "../authentication/service/login.service";
import {Router} from "@angular/router";
import {UserDto} from "../authentication/model/userDto";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authenticated: boolean;
  failedAuthentication: boolean = false;
  REGISTER_ROUTE: RouteInfo = { path: '/register', title: 'Register',  icon:'ni-key-25 text-info', class: '' }

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  login(email: string, password: string): void {
    console.log("Here is where the login should start...");
    this.loginService.checkCredentials(email, password).subscribe(
        (response) => {
            console.log("In login component")
            console.log("Token:");
            console.log(response);
            if (response.body != null) {
                localStorage.setItem('token', response.body['token']);
                localStorage.setItem('username', email);
                console.log("Response is positive.");
                console.log(response.body['token']);
                this.authenticated = true;
                document.defaultView.location.reload();
                this.router.navigate(['/dashboard']).then(p => {window.location.reload(); return true});
            } else {
                this.authenticated = false;
                this.failedAuthentication = true;
            }
        }
    )
  }

  ngOnDestroy() {
  }

}
