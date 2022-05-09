import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../model/userDto";
import {Credentials} from "../model/credentials";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint = "http://localhost:8080/auth/login";

  constructor(private httpClient: HttpClient) { }

  checkCredentials(email: string, password: string): Observable<UserDto>{
    let body = new Credentials(email, password);
    console.log("From auth.service");
    return this.httpClient.post<UserDto>(this.endpoint, body);
  }
}
