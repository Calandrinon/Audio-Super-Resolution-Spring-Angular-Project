import { Component, OnInit, OnDestroy } from '@angular/core';
import {LoginService} from "../authentication/service/login.service";
import {Router} from "@angular/router";
import {UserDto} from "../authentication/model/userDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authenticated: boolean;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  login(email: string, password: string): void {
    console.log("Here is where the login should start...");
    localStorage.setItem('current-user', JSON.stringify(-1));
    this.loginService.checkCredentials(email, password).subscribe(
        (response: UserDto) => {
          if(response.id !== -1){
            console.log("Response is positive.")
            this.authenticated = true
            console.log(JSON.stringify(response))
            localStorage.setItem('current-user', JSON.stringify(response.id))
            document.defaultView.location.reload()
            this.router.navigate(['/dashboard']).then(p => {window.location.reload(); return true});
          }
          else {
            console.log("Response is negative.")
            this.authenticated = false
          }
        }
    )
  }

  ngOnDestroy() {
  }

}
