import {Component, OnInit} from '@angular/core';
import {PredictionArchiveDownloadService} from "./prediction-archive-download.service";

import * as jsZip from "jszip";
import * as jsZipUtils from "jszip-utils";

@Component({
    selector: 'app-prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {
    displayStyle = "none";


    constructor(private predictionArchiveDownloadService: PredictionArchiveDownloadService) {
    }

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
        this.predictionArchiveDownloadService.downloadPrediction(localStorage.getItem('token'))
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
                                file = new Blob([fileData], {type: "image/png"});
                                let spectrogram_image_element = document.createElement("img");
                                this.blobToBase64(file).then(image => {
                                    spectrogram_image_element.src = <string>image;
                                    spectrogram_image_element.style.width = "100%";
                                    spectrogram_image_element.style.height = "auto";
                                    let outputs_container = document.getElementById("spectrogram-container");
                                    outputs_container.append(spectrogram_image_element);
                                });
                            } else {
                                file = new Blob([fileData], {type: "audio/wav"});
                                let wav_file_element = document.createElement("audio");
                                wav_file_element.controls = true;
                                wav_file_element.classList.add("audio-track")
                                wav_file_element.classList.add("mx-auto")
                                files.push(file);

                                this.blobToBase64(file).then(audio => {
                                    let source_element = document.createElement("source");
                                    source_element.src = <string>audio;
                                    source_element.type = "audio/wav";
                                    wav_file_element.append(source_element)
                                    let outputs_container = document.getElementById("audio-tracks-container");
                                    outputs_container.append(wav_file_element);
                                });
                            }
                        });
                    });

                    let elementsToHide = Array.from(document.getElementsByClassName("myLoader") as HTMLCollectionOf<HTMLElement>);

                    for (let i = 0; i < elementsToHide.length; i++) {
                        // elementsToHide[i].style.visibility = "hidden";
                        elementsToHide[i].style.display = "none";
                    }
                });
            });
    }

    openPopup() {
        this.displayStyle = "block";

        let elementsToHide = Array.from(document.getElementsByClassName("myLoader") as HTMLCollectionOf<HTMLElement>);

        for (let i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].style.display = "block";
        }

        this.downloadPredictionZipArchive();
    }

    closePopup() {
        const spectrogram_container_element = document.getElementById("spectrogram-container");
        spectrogram_container_element.innerHTML = "";

        const audio_tracks_container_element = document.getElementById("audio-tracks-container");
        audio_tracks_container_element.innerHTML = "";

        this.displayStyle = "none";
    }

}
