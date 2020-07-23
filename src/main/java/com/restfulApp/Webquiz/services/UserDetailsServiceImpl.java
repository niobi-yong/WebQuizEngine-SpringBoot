package com.restfulApp.Webquiz.services;

import com.restfulApp.Webquiz.models.User;
import com.restfulApp.Webquiz.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        return user;
    }

    @Override
    public User saveUser(User user) {
        User createUser = new User(user.getEmail(), bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(createUser);
    }

    @Override
    public User findUser(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean isEmailAvailable(User user) {
        return userRepository.findByEmail(user.getEmail()) == null;
    }
}
