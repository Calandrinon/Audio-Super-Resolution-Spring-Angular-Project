package com.ubb.audiosuperres.repository;

import com.ubb.audiosuperres.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.id = ?1")
    Optional<User> findOne(Integer id);

    Optional<User> findByUsername(String username);
}
