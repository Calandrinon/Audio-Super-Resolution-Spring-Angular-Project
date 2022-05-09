package com.ubb.audiosuperres.controller;

import com.ubb.audiosuperres.model.UserDto;
import com.ubb.audiosuperres.service.AuthenticationService;
import io.vavr.control.Option;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicReference;

@CrossOrigin
@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto) {
        AtomicReference<ImmutablePair<Integer, String>> userPair = new AtomicReference<>();
        authenticationService.checkUserCredentials(userDto).ifPresentOrElse(
                userPair::set,
                () -> userPair.set(new ImmutablePair<>(-1, "")));
        userDto.setId(userPair.get().left);
        userDto.setUsername(userPair.get().right);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        return Option.of(authenticationService.createAccount(userDto))
                .filter(returnedUserDto -> !returnedUserDto.getUsername().isEmpty())
                .map(returnedUserDto -> new ResponseEntity<>(returnedUserDto, HttpStatus.OK))
                .getOrElse(new ResponseEntity<>(new UserDto("", "", ""), HttpStatus.UNAUTHORIZED));
    }
}
