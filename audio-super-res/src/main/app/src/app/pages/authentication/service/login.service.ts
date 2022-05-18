import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../model/userDto";
import {Credentials} from "../model/credentials";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint = "http://localhost:8080/auth/login";

  constructor(private httpClient: HttpClient) { }

  checkCredentials(username: string, password: string): Observable<HttpResponse<Object>> {
    let body = new Credentials(username, password);
    console.log("From auth.service");
    return this.httpClient.post(this.endpoint, body, {observe: 'response'});
  }
}
