import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../model/userDto";
import {Credentials} from "../model/credentials";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  endpoint = "http://localhost:8080/auth/register";

  constructor(private httpClient: HttpClient) { }

  saveNewAccount(username: string, email: string, password: string): Observable<HttpResponse<Object>> {
    let body = new Credentials(username, email, password);
    console.log("From register.service");
    return this.httpClient.post(this.endpoint, body, {observe: 'response'});
  }
}
