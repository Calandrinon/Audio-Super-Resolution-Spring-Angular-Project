package com.ubb.audiosuperres.service;

import java.io.*;
import java.net.URISyntaxException;
import java.util.Optional;

public interface PredictionService {
    Optional<File> retrievePrediction() throws IOException;

    byte[] sendBase64Recording(String base64Recording) throws URISyntaxException;
}
