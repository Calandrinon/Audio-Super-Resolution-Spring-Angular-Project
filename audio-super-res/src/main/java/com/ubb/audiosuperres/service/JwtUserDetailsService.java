package com.ubb.audiosuperres.service;

import java.util.ArrayList;
import java.util.Optional;

import com.ubb.audiosuperres.model.UserDto;
import com.ubb.audiosuperres.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private AuthenticationRepository repository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<com.ubb.audiosuperres.model.User> userOptional = repository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        com.ubb.audiosuperres.model.User user = userOptional.get();

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public com.ubb.audiosuperres.model.User save(UserDto userDto) {
        com.ubb.audiosuperres.model.User newUser = new com.ubb.audiosuperres.model.User();

        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(bcryptEncoder.encode(userDto.getPassword()));
        newUser.setEmail(userDto.getEmail());

        if (!this.doesTheUsernameExist(userDto))
            return repository.save(newUser);
        return new com.ubb.audiosuperres.model.User("", "", "");
    }

    public boolean doesTheUsernameExist(UserDto userDto) {
        return repository.findByUsername(userDto.getUsername()).isPresent();
    }
}
