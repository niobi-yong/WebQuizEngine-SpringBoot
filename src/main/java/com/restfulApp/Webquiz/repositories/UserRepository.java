package com.restfulApp.Webquiz.repositories;

import com.restfulApp.Webquiz.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User save(User user);
}
