package com.ubb.audiosuperres.service;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.Channels;
import java.util.Optional;

@Service
public class PredictionServiceImpl implements PredictionService {
    private static final String predictionUrl = "http://127.0.0.1:5000/predict";

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
}
