import { Component, OnInit } from '@angular/core';
import {PredictionArchiveDownloadService} from "./prediction-archive-download.service";

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

  constructor(private predictionArchiveDownloadService: PredictionArchiveDownloadService) { }

  ngOnInit(): void {
  }

  public downloadPredictionZipArchive(): void {
    document.getElementById('loading').style.display = 'block';
    this.predictionArchiveDownloadService.downloadPrediction()
        .subscribe(response => {
            if (response.ok) {
                this.hideLoader();
            }
            let filename = "prediction.zip";
            let blob: Blob = response.body as Blob;
            let a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.click();
        })
  }

  hideLoader() {
    document.getElementById('loading').style.display = 'none';
  }

}
