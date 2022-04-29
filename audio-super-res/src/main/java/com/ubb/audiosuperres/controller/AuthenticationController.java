package com.ubb.audiosuperres.controller;

import com.ubb.audiosuperres.model.UserDto;
import com.ubb.audiosuperres.service.AuthenticationService;
import io.vavr.control.Option;
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
        AtomicReference<Integer> userId = new AtomicReference<>();
        authenticationService.checkUserCredentials(userDto).ifPresentOrElse(
                userId::set,
                () -> userId.set(-1));
        userDto.setId(userId.get());
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
