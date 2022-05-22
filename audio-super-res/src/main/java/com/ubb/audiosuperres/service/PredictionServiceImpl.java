package com.ubb.audiosuperres.service;

import org.apache.commons.io.FileUtils;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.*;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PredictionServiceImpl implements PredictionService {
    private static final String predictionUrl = "http://127.0.0.1:5000/predict";
    private static final String uploadUrl = "http://127.0.0.1:5000/upload";

    @Override
    public Optional<File> retrievePrediction() throws IOException {
        try {
            URL url = new URL(predictionUrl);
            File file = new File("prediction.zip");
            FileUtils.copyURLToFile(url, file);
            return Optional.of(file);
        } catch (IOException exception) {
            exception.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public byte[] sendBase64Recording(String base64Recording) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        String requestJson = "{\"recordingAsBase64\":\"" + base64Recording + "\"}";
        System.out.println("Request JSON:");
        System.out.println(requestJson);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
        ResponseEntity<byte[]> downloadedBytes = restTemplate.exchange(uploadUrl, HttpMethod.POST, entity, byte[].class);

        return downloadedBytes.getBody();
    }
}
