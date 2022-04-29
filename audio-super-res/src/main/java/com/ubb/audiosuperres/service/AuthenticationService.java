package com.ubb.audiosuperres.service;

import com.ubb.audiosuperres.model.User;
import com.ubb.audiosuperres.model.UserDto;

public interface AuthenticationService {
    User getUserBasedOnId(Integer id) throws IllegalArgumentException;
    boolean checkUserCredentials(UserDto userDto);
    boolean doesTheUsernameExist(UserDto userDto);
    UserDto createAccount(UserDto userDto);
}
