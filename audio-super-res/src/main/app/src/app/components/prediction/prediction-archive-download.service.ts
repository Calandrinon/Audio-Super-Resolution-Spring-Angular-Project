import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PredictionArchiveDownloadService {
  private springBootPredictionEndpoint: string = "http://localhost:8080/api/prediction";

  constructor(private httpClient: HttpClient) { }

  public downloadPrediction() {
    return this.httpClient.get(this.springBootPredictionEndpoint, {observe: 'response', responseType: 'blob'});
  }
}
