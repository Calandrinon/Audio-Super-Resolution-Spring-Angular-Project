package com.ubb.audiosuperres.controller;

import com.ubb.audiosuperres.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class PredictionController {
    @Autowired
    private PredictionService predictionService;

    @PostMapping(value = "/prediction")
    public ResponseEntity<Object> returnPredictionZipFile() {
        try {
            Optional<File> fileOptional = predictionService.retrievePrediction();
            fileOptional.orElseThrow(NullPointerException::new);
            File zipArchive = fileOptional.get();
            InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(zipArchive));
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", zipArchive.getName()));
            return ResponseEntity.ok().headers(headers)
                    .contentLength(zipArchive.length())
                    .contentType(MediaType.parseMediaType("application/zip")).body(inputStreamResource);
        } catch (Exception exception) {
            System.out.println("An error occured while retrieving the prediction:");
            exception.printStackTrace();
        }

        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }
}
