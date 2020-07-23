package com.restfulApp.Webquiz.services;

import com.restfulApp.Webquiz.models.User;

public interface UserService {

    User findUser(String email);

    User saveUser(User user);

    boolean isEmailAvailable(User user);
}
