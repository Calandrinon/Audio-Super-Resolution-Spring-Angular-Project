import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PredictionArchiveDownloadService {
  private springBootPredictionEndpoint: string = "http://localhost:8080/api/prediction";

  constructor(private httpClient: HttpClient) { }

  public downloadPrediction(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get(this.springBootPredictionEndpoint, {observe: "response", headers, responseType: 'blob'});
  }
}
