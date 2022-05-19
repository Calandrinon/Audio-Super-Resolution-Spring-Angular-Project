import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import * as RecordRTC from 'recordrtc';

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

    constructor(private domSanitizer: DomSanitizer) {
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
    }

    processRecording(blob) {
        this.url = URL.createObjectURL(blob);
        console.log("blob", blob);
        console.log("url", this.url);
    }

    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }

    ngOnInit() {
    }

}
