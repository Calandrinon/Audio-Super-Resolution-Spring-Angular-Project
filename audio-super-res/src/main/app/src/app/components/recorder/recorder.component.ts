import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import * as RecordRTC from 'recordrtc';
import {RecorderService} from "./recorder.service";
import * as jsZip from "jszip";

@Component({
    selector: 'app-recorder',
    templateUrl: './recorder.component.html',
    styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit {
    title = 'micRecorder';
    record: any;
    recording = false;
    url: string;
    error: string;
    displayStyle: string;

    constructor(private domSanitizer: DomSanitizer,
                private recorderService: RecorderService) {
    }

    public blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

    initiateRecording() {
        this.recording = true;
        let mediaConstraints = {
            video: false,
            audio: true
        };
        navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    successCallback(stream) {
        var options = {
            mimeType: "audio/wav",
            numberOfAudioChannels: 1,
            sampleRate: 48000,
        };
        var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
        this.record = new StereoAudioRecorder(stream, options);
        this.record.record();
    }

    stopRecording() {
        this.recording = false;
        this.record.stop(this.processRecording.bind(this));
        this.openPopup();
    }

    openPopup() {
        this.displayStyle = "block";

        let elementsToHide = Array.from(document.getElementsByClassName("myLoader") as HTMLCollectionOf<HTMLElement>);

        for (let i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].style.display = "block";
        }
    }

    closePopup() {
        const spectrogram_container_element = document.getElementById("custom-spectrogram-container");
        spectrogram_container_element.innerHTML = "";

        const audio_tracks_container_element = document.getElementById("custom-audio-tracks-container");
        audio_tracks_container_element.innerHTML = "";

        this.displayStyle = "none";
    }

    processRecording(blob) {
        this.url = URL.createObjectURL(blob);
        console.log("blob", blob);
        this.blobToBase64(blob).then(base64_wav => {
            console.log("Base64 WAV file:");
            console.log(base64_wav);
            console.log("url", this.url);
            console.log("Sending the WAV blob as base64...");
            let token = localStorage.getItem("token");
            this.recorderService.uploadAudioRecording(token, base64_wav).subscribe(response => {
                console.log("Response body:")
                console.log(response.body)
                let archive_filename = "upload-and-predict.zip";
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
                                    let outputs_container = document.getElementById("custom-spectrogram-container");
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
                                    let outputs_container = document.getElementById("custom-audio-tracks-container");
                                    outputs_container.append(wav_file_element);
                                });
                            }
                        });
                    });

                    let elementsToHide = Array.from(document.getElementsByClassName("myLoader") as HTMLCollectionOf<HTMLElement>);

                    for (let i = 0; i < elementsToHide.length; i++) {
                        elementsToHide[i].style.display = "none";
                    }
                });
            });
        });
    }

    errorCallback(error) {
        this.error = 'Cannot play audio in your browser';
    }

    ngOnInit() {
    }

}
