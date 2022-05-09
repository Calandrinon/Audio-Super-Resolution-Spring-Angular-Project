package com.ubb.audiosuperres.service;

import com.ubb.audiosuperres.model.User;
import com.ubb.audiosuperres.model.UserDto;
import com.ubb.audiosuperres.repository.AuthenticationRepository;
import io.vavr.control.Option;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.MutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private AuthenticationRepository repository;

    public User getUserBasedOnId(Integer id) throws IllegalArgumentException{
        return this.repository.findOne(id).orElseThrow(IllegalArgumentException::new);
    }

    @Override
    public Optional<User> getUserBasedOnUsername(String username) {
        return this.repository.findByUsername(username);
    }

    @Override
    public Optional<User> getUserBasedOnEmail(String email) {
        return this.repository.findByEmail(email);
    }

    @Override
    public Optional<ImmutablePair<Integer, String>> checkUserCredentials(UserDto userDto) {
        Optional<User> userOptional = this.getUserBasedOnEmail(userDto.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("The user:");
            System.out.println(user);
            return Option.of(user.getPassword())
                    .filter(password -> password.equals(userDto.getPassword()))
                    .map(x -> Optional.of(new ImmutablePair<>(user.getId(), user.getUsername())))
                    .getOrElse(Optional.empty());
        }
        return Optional.empty();
    }

    @Override
    public UserDto createAccount(UserDto userDto) {
        User user = new User(userDto.getUsername(), userDto.getPassword(), userDto.getEmail());
        if (!this.doesTheUsernameExist(userDto)) {
            repository.save(user);
            userDto.setId(user.getId());
            return userDto;
        }
        return new UserDto("", "", "");
    }

    @Override
    public boolean doesTheUsernameExist(UserDto userDto) {
        return repository.findByUsername(userDto.getUsername()).isPresent();
    }
}
