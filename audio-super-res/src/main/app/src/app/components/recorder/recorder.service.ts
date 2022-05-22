import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RecorderService {
    private springBootPredictionEndpoint: string = "http://localhost:8080/api/prediction";
    private springBootUploadEndpoint: string = "http://localhost:8080/api/upload";

    constructor(private httpClient: HttpClient) {
    }

    public downloadPrediction(token: string) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.httpClient.get(this.springBootPredictionEndpoint, {
            observe: "response",
            headers,
            responseType: 'blob'
        });
    }

    public uploadAudioRecording(token: string, recording: any) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.httpClient.post(this.springBootUploadEndpoint, recording, {observe: "response", headers, responseType: 'blob'});
    }
}
