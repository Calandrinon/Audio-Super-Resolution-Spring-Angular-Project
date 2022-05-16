import { Component, OnInit } from '@angular/core';
import {PredictionArchiveDownloadService} from "./prediction-archive-download.service";

import * as jsZip from "jszip";
import * as jsZipUtils from "jszip-utils";

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

  constructor(private predictionArchiveDownloadService: PredictionArchiveDownloadService) { }

  ngOnInit(): void {
  }

    public blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }


    public downloadPredictionZipArchive(): void {
    this.predictionArchiveDownloadService.downloadPrediction()
        .subscribe(response => {
            console.log("Response body:")
            console.log(response.body)
            let archive_filename = "prediction.zip";
            let blob: Blob = response.body as Blob;
            let a = document.createElement('a');
            a.download = archive_filename;
            a.href = window.URL.createObjectURL(blob);
            a.click();

            jsZip.loadAsync(blob).then((zip) => {
                let files: Blob[] = [];

                Object.keys(zip.files).forEach((filename) => {
                    console.log("Filename:")
                    console.log(filename)
                    zip.files[filename].async('blob').then((fileData) => {
                        let file: Blob;
                        if (filename.includes(".png")) {
                            file = new Blob([fileData], { type: "image/png" });
                            let spectrogram_image_element = document.createElement("img");
                            let base64_image = this.blobToBase64(file).then(image => {
                                spectrogram_image_element.src = <string>image;
                                let outputs_container = document.getElementById("outputs-container");
                                outputs_container.append(spectrogram_image_element);
                            });
                        } else {
                            file = new Blob([fileData], { type: "audio/wav" });
                            files.push(file);
                        }
                    });
                });

            });
        });
  }
}
