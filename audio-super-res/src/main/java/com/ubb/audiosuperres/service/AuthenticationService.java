package com.ubb.audiosuperres.service;

import com.ubb.audiosuperres.model.User;
import com.ubb.audiosuperres.model.UserDto;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.springframework.data.util.Pair;

import java.util.Optional;

public interface AuthenticationService {
    User getUserBasedOnId(Integer id) throws IllegalArgumentException;
    Optional<User> getUserBasedOnEmail(String email);
    Optional<User> getUserBasedOnUsername(String username);
    Optional<ImmutablePair<Integer, String>> checkUserCredentials(UserDto userDto);
    boolean doesTheUsernameExist(UserDto userDto);
    UserDto createAccount(UserDto userDto);
}
