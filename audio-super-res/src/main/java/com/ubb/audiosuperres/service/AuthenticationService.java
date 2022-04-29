package com.ubb.audiosuperres.service;

import com.ubb.audiosuperres.model.User;
import com.ubb.audiosuperres.model.UserDto;

import java.util.Optional;

public interface AuthenticationService {
    User getUserBasedOnId(Integer id) throws IllegalArgumentException;
    Optional<User> getUserBasedOnUsername(String username);
    Optional<Integer> checkUserCredentials(UserDto userDto);
    boolean doesTheUsernameExist(UserDto userDto);
    UserDto createAccount(UserDto userDto);
}
