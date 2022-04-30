package com.ubb.audiosuperres.service;

import java.io.*;
import java.util.Optional;

public interface PredictionService {
    Optional<File> retrievePrediction() throws IOException;
}
